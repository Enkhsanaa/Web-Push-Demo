function NewlineText(props) {
  const { text } = props;
  const newText = text.split("\n").map((str) => <p>{str}</p>);
  return newText;
}

export default NewlineText;
