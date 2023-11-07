export const ContactFilter = ({ onChange }) => {
  return <input onChange={e => onChange(e.target.value)}></input>;
};
