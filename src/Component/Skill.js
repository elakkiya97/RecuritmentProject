import React, { useState } from 'react';

function Skill() {
  const [softSkills, setSoftSkills] = useState([]);
  const [hardSkills, setHardSkills] = useState([]);
  const [languages, setLanguages] = useState([]);

  const handleSoftSkillChange = (event) => {
    setSoftSkills([...softSkills, event.target.value]);
  };

  const handleHardSkillChange = (event) => {
    setHardSkills([...hardSkills, event.target.value]);
  };

  const handleLanguageChange = (event) => {
    setLanguages([...languages, event.target.value]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const skillData = {
      SoftSkill: softSkills,
      HardSkill: hardSkills,
      Language: languages
    };

    try {
      const response = await fetch('http://localhost:5042/api/education/skilluser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(skillData)
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Skills added successfully:', responseData);
        // You can handle success here, show a success message, reset form, etc.
      } else {
        const errorResponse = await response.json();
        console.error('Error adding skills:', errorResponse);
        // Handle the error, show an error message, etc.
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Soft Skills:
          <select onChange={handleSoftSkillChange}>
            <option value="Skill 1">Skill 1</option>
            <option value="Skill 2">Skill 2</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label>
          Hard Skills:
          <select onChange={handleHardSkillChange}>
            <option value="Skill 3">Skill 3</option>
            <option value="Skill 4">Skill 4</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <label>
          Languages:
          <select onChange={handleLanguageChange}>
            <option value="Language 1">Language 1</option>
            <option value="Language 2">Language 2</option>
            {/* Add more options as needed */}
          </select>
        </label>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Skill;
