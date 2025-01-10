import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be Loaded");
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  let query = supabase.from("cabins");
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  // https://fzdhmsscbygvhkzygvbq.supabase.co/storage/v1/object/public/cabin-images/cabin-004.jpg
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. IF there is no id, means no Edit, so we Create Cabin
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }

  // 1. IF there is id, means it's Edit, so we Edit Cabin
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(`Cabin could not be ${!id ? "Created" : "Edited"}`);
  }

  // Return if we ALREADY have an Image
  if (hasImagePath) return;

  // 2. Upload Image
  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error("Cabin Image could not be Uploaded");
  }

  return data;
}

export async function deleteCabin(cabinId) {
  // Deleting the cabin
  const { error } = await supabase.from("cabins").delete().eq("id", cabinId);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be Deleted");
  }
}
