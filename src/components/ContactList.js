export const ContactList = ({ items, deleteContact }) => {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>
          <p>
            {item.name} {item.number}
          </p>
          <button type="button" onClick={() => deleteContact(item.id)}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};
