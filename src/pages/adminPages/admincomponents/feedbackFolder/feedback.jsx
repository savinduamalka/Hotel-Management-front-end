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

  if (!token) {
    return (
      <a
        href="/login"
        className="bg-[#7E60BF] text-[#FEF9F2] px-4 py-2 rounded hover:bg-[#6A4FA0] transition duration-300"
        style={{ fontSize: "18px" }}
      >
        Login
      </a>
    );
  }
  
  return (
    <div>
    </div>
  )
}
