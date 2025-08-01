import React, { useState ,useEffect} from 'react'
import './index.css'

function Fbcontainer() {
  const [rating, setRating] = useState('');
  const [suggestion, setSuggestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [clgname, setClgname] = useState('');
  const [training, setTraining] = useState('');
  const [fb,setFb]=useState('');
  
  
  const fetchfb=async()=>{
    try{
        const response=await fetch('http://localhost:3000/fb');
        const data=await response.json();
        setFb(data);

    }
    catch(error){
        console.error("Failed to fetch",error);
    }
  }
console.log(fb);

useEffect(()=>{
    fetchfb();
},[]);


const handleSubmit = (e) => {
  e.preventDefault();
  if (!name) alert('Please enter your Name!');
  else if (!rating) alert('Please select a rating!');
  else if (!suggestion) alert('Please fill the suggestion!');
  else {
    addfb(name, department, clgname, training, rating, suggestion); 
    setSubmitted(true);
  }
};


//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!name) alert('Please enter your Name!');
//     else if (!rating) alert('Please select a rating!');
//     else if (!suggestion) alert('Please fill the suggestion!');
//     else {
//         addfb(name, department, clgname, training, rating, suggestion);
//         setSubmitted(true);}
//   };
const addfb=async(name,department,clgname,training,rating,suggestion)=>{
    try{
  const response=await fetch('http://localhost:3000/fb', {
  method: 'POST',
  headers: {'Content-Type': 'application/json',},
  body: JSON.stringify({
    name,
    department,
    collegeName: clgname,
    training,
    rating,
    suggestion
  })
});
 if(response.ok){
    const newfb=await response.json();
    setFb ((prev)=>[...prev,newfb]);
 }
 else{
    console.error("Failed to add feedback");
 }
    }
    catch(error){
        console.error("Error adding feedback",error);
    }
};

  const handleReset = () => {
    setName('');
    setDepartment('');
    setClgname('');
    setRating('');
    setSuggestion('');
    setSubmitted(false);
    setTraining('');
  };

  return (
    <>
    <div className='bg-image'>
      <h1 className='head'>Feedback !!!</h1>
      <div className="container">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="form">
            <label className='label'>Name</label>
            <textarea
              className='textarea'
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
            />

            <label className='label'>Department</label>
            <select
              className='textarea'
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
            >
              <option value="">-- Select Department --</option>
              <option value="CSE">CSE</option>
              <option value="IT">IT</option>
              <option value="AI">AI</option>
              <option value="ECE">ECE</option>
              <option value="EEE">EEE</option>
            </select>

            <label className='label'>Training</label>
            <select
              className='textarea'
              value={training}
              onChange={(e) => setTraining(e.target.value)}
            >
              <option value="">-- Select Training --</option>
              <option value="MERN">MERN Stack</option>
              <option value="MEAN">MEAN Stack</option>
              <option value="UI/UX">UI/UX Designing</option>
              <option value="JAVA">JAVA Programming</option>
              <option value="PYTHON">Python Programming</option>
            </select>

            <label className='label'>College Name</label>
            <textarea
              className='textarea'
              value={clgname}
              onChange={(e) => setClgname(e.target.value)}
              placeholder="Enter your college name..."
            />

            <label className='label'>How was the content delivered today?</label>
            <div className="radio-group">
              {['Less sufficient', 'Neutral', 'Sufficient', 'More than sufficient'].map((option) => (
                <label key={option} className="radio-label">
                  <input
                    type="radio"
                    value={option}
                    checked={rating === option}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  {option}
                </label>
              ))}
            </div>

            <label className='label'>Any improvements you'd suggest?</label>
            <textarea
              className='textsuggestion'
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder="Your suggestions here..."
            />

            <button type="submit" className="button">Submit Feedback</button>
          </form>
        ) : (
          <div className="summary">
            <h2>🎉Thank you for your feedback!🎉</h2>
            <br/>
            <h4>🧠 Every thought counts!<br />Your ideas power the next big leap🌟<br/>Let's Grow Together 🌱</h4>
            <button onClick={handleReset} className="button">Give Another Feedback</button>
          </div>
        )}
      </div>
      </div>
    </>
  );
}

export default Fbcontainer;
