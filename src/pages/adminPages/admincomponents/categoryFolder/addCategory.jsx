import React, { useEffect, useState } from 'react'

export default function AddCategory() {
  const [name,setName]=useState('');
  const[price,setPrice]=useState(0);
  const [features,setFeatures]=useState([]);
  const [image,setImages]=useState('');
  const [isLoaded,setIsLoaded]=useState(false);

  const token = localStorage.getItem("token");

  if(!token){
    window.location.href="/login";
  }




  return (
    <div>
      
      
    </div>
  )
}
