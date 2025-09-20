import { useState } from "react";
import uploadMedia from "../../../../utils/mediaUpload";
import axios from "axios"
import toast from "react-hot-toast";

export default function AddCategoryForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [features, setFeatures] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading,setIsLoading] = useState(false)

  const token = localStorage.getItem("token")
  if(token == null){
    window.location.href = "/login"
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const featuresArray = features.split(",").map(f => f.trim());
    
  
    uploadMedia(image)
      .then((url) => { 
        const categoryInfo = {
          name: name,
          price: price,
          features: featuresArray,
          description: description,
          image: url,
        };
  
        return axios.post(import.meta.env.VITE_BACKEND_URL + "api/categories", categoryInfo, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
      })
      .then((res) => {
        
        setIsLoading(false);
        toast.success("Category added successfully!");
        setName("");
        setPrice(0);
        setFeatures("");
        setDescription("");
        setImage(null);
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        setIsLoading(false);
        toast.error("Error adding category. Please try again.");
      });
  }
  
  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md p-8 space-y-4 bg-white rounded shadow-lg">
        <div>
          <label className="block text-gray-700">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Price:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Features (comma-separated):</label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700">Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 mt-1 border rounded"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="w-full px-4 py-2 mt-1"
          />
        </div>

        <button
          type="submit"
          className="flex justify-center w-full px-4 py-2 mt-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {
            isLoading?
            <div className="border-t-2 border-t-white w-[20px] min-h-[20px] rounded-full animate-spin"></div>
            :
            <span>
            Add category
          </span>
          }
        </button>
      </form>
    </div>
  );
}
