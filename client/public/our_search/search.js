function searchProperties(query) {
    const lowerQuery = query.toLowerCase();
    return posts.filter(post => {
        // בדוק אם יש התאמה בכותרת, תיאור, עיר או שכונה
        return (
            post.title?.toLowerCase().includes(lowerQuery) ||
            post.city?.toLowerCase().includes(lowerQuery) ||
            post.neighborhood?.toLowerCase().includes(lowerQuery) ||
            post.description?.toLowerCase().includes(lowerQuery)
        );
    });
}
async function fetchPosts() {
    try {
        const response = await fetch('http://localhost:5001/api/users/apartments');
        if (!response.ok) {
            throw new Error(`Error fetching apartments: ${response.status}`);
        }
        posts = await response.json();
        console.log('Fetched posts:', posts); // בדיקה - האם הנתונים מגיעים
    } catch (error) {
        console.error('Error fetching apartments:', error);
        resultsContainer.innerHTML = '<p>There was an error fetching the results.</p>';
    }
}
