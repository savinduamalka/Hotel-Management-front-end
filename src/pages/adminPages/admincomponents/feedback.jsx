import React from 'react'

export default function Feedback() {
  const [feedback, setFeedback] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const token=localStorage.getItem("token");

  useEffect(
    () => {
    if (token && !isLoaded) {
      axios.get('http://localhost:3000/api/feedback',
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        }
      )
        .then((res) => {
          setCategories(res.data.feedback);
          setIsLoaded(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isLoaded]);

  return (
    <div>
    </div>
  )
}
