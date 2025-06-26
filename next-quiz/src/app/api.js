export async function fetchData(amount, category, difficulty) {
    
    const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;

    try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Fejl ved API-kald: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Noget gik galt:', error);
    return null;
  }
}
