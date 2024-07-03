import React, { useState,useEffect } from 'react'
import ButtonComponent from '../Button'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../firebase';
import { toast } from 'react-toastify';
import { doc, getDoc } from 'firebase/firestore';

const EpisodeDetails = ({Title,Description,AudioFile,onClick,id,podcastID}) => {
  const navigate = useNavigate();
  const[podcast,setPodcast]=useState({});
  const HandleEdit=(id)=>{
      navigate(`/podcasts/${podcastID}/episodes/${id}/edit-episode`);
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
      <p>{Title}</p>
      <p>{Description}</p>
      <div className='button group'> 
        
      <ButtonComponent text="PLAY" onClick={()=>onClick(AudioFile)}/>
     {podcast.Created_by!==auth.currentUser.uid && <ButtonComponent onClick={()=>HandleEdit(id)} text="Edit Epdisode" /> } 
     {/* <ButtonComponent onClick={()=>HandleEdit(id)} text="Edit Epdisode" disabled={podcast.Created_by!==auth.currentUser.uid}/></div> */}
    </div> 
    </div>
  )
}

export default EpisodeDetails
