import styled from "styled-components";
import Tag from "../../ui/Tag";
import Flag from "../../ui/Flag";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";
import { useCheckout } from "./useCheckout";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { checkout, isCheckingOut } = useCheckout();
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      {status === "unconfirmed" ? (
        <Tag type="green">Arriving</Tag>
      ) : (
        <Tag type="blue">Departing</Tag>
      )}

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.fullName}`} />

      <Guest>{guests.fullName}</Guest>

      <div>{numNights}</div>

      {status === "unconfirmed" ? (
        <Button
          as={Link}
          to={`/checkin/${id}`}
          size="small"
          variation="primary"
        >
          Check in
        </Button>
      ) : (
        <Button
          disabled={isCheckingOut}
          onClick={() => checkout(id)}
          size="small"
          variation="danger"
        >
          Check out
        </Button>
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
