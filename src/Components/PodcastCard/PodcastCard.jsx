import React, { useEffect, useState } from 'react'

import { Link, useNavigate } from 'react-router-dom';
import ButtonComponent from '../Button';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
const PodcastCard = ({ id,DisplayImg,Title}) => {
  const navigate =useNavigate();
  const[podcast,setPodcast]=useState({});
  const handleEdit=(id)=>{
    navigate(`/podcasts/${id}/edit`);
  }
  useEffect(()=>{
    const fetchPodcast = async()=>{
    try{
      const podcastDoc= await getDoc(doc(db,"podcasts",id));
      if(podcastDoc.exists()){
        setPodcast({id:podcastDoc.id,...podcastDoc.data()});
      }
    }
    catch(error){
      toast.error(error.message);
    }
      }
  fetchPodcast();
},[id])
  
  return (
    <div className='podcast-card'>
        <img src={DisplayImg}/>
        <h3 className='card-title'>{Title}</h3>
        <ButtonComponent onClick={()=>handleEdit(id)} text="Edit-Podcast" disabled={podcast.Created_by!=auth.currentUser.uid} />
         <Link to={`/podcasts/${id}`}>Click For Details</Link>
      
    </div>
   
  )
}

export default PodcastCard
