const copyToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    console.error("Clipboard API not available. Using fallback.");

    return;
  }

  try {
    await navigator.clipboard.writeText(text);
    console.log("Text successfully copied!");
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};

export default copyToClipboard;
