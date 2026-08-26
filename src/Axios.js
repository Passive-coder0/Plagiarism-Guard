const scanEssay = async () => {
  try {
    const response = await axios.post("YOUR_N8N_WEBHOOK_URL", {
      text: essayText
    });

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default scanEssay;