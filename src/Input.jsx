import FileBase64 from "react-file-base64";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

const Input = () => {
  const [image, setImage] = useState("");
  const [formData, setFormData] = useState({
    image: "",
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
    city: "",
    address: "",
    education: [{ degree: "", institute: "", year: "", eduId: 0 }],
    experience: [
      { job: "", company: "", duration: "", description: "", exId: 0 },
    ],
    skills: [""],
    hobbies: [""],
  });

  const navigate = useNavigate();

  const handleDone = (e) => {
    setImage(e.selectedFile.base64);
    setFormData((prevData) => ({ ...prevData, image: e.selectedFile.base64 }));
  };

  // For Basic Inputs
  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
  };

  // Education functions
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index][field] = value;
    setFormData((prevData) => ({ ...prevData, education: updatedEducation }));
  };

  const addEducation = () => {
    setFormData((prevData) => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          degree: "",
          institute: "",
          year: "",
          eduId: Date.now(),
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    if (formData.education.length === 1) return;
    const updatedEducation = formData.education.filter(
      (edu, idx) => idx !== index
    );
    setFormData((prevData) => ({ ...prevData, education: updatedEducation }));
  };

  // Experience Functions
  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData((prevData) => ({ ...prevData, experience: updatedExperience }));
  };

  const addExperience = () => {
    setFormData((prevData) => ({
      ...prevData,
      experience: [
        ...prevData.experience,
        {
          job: "",
          company: "",
          duration: "",
          description: "",
          eduId: Date.now(),
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    if (formData.experience.length === 1) return;
    const updatedExperience = formData.experience.filter(
      (ex, idx) => idx !== index
    );
    setFormData((prevData) => ({ ...prevData, experience: updatedExperience }));
  };

  // Skills Fuctions
  const handleSkillsChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData((prevData) => ({ ...prevData, skills: updatedSkills }));
  };

  const addSkill = () => {
    setFormData((prevData) => ({
      ...prevData,
      skills: [...prevData.skills, ""],
    }));
  };

  const removeSkill = (index) => {
    if (formData.skills.length === 1) return;
    const updatedSkills = formData.skills.filter((skill, idx) => idx !== index);
    setFormData((prevData) => ({ ...prevData, skills: updatedSkills }));
  };

  // Hobbies Functions
  const handleHobbiesChange = (index, value) => {
    const updatedHobbies = [...formData.hobbies];
    updatedHobbies[index] = value;
    setFormData((prevData) => ({ ...prevData, hobbies: updatedHobbies }));
  };

  const addHobby = () => {
    setFormData((prevData) => ({
      ...prevData,
      hobbies: [...prevData.hobbies, ""],
    }));
  };

  const removeHobby = (index) => {
    if (formData.hobbies.length === 1) return;
    const updatedHobbies = formData.hobbies.filter(
      (hobby, idx) => idx !== index
    );
    setFormData((prevData) => ({ ...prevData, hobbies: updatedHobbies }));
  };

  const onSubmit = () => {
    localStorage.setItem("data", JSON.stringify(formData));
    navigate("/cv");
  };

  return (
    <div className="p-8 bg-[#ecececb7] w-4/5 mx-auto flex flex-col items-center gap-6">
      <h1 className="font-bold text-4xl">Type in your details</h1>
      <form onSubmit={onSubmit} className="flex flex-col w-full gap-6">
        <div className="flex flex-col gap-6">
          <div className="h-[150px] w-[150px] border-2 border-gray-400">
            {image ? (
              <img src={image} className="w-full" alt="profile pic" />
            ) : null}
          </div>
          <FileBase64
            onDone={(base64) => handleDone({ selectedFile: base64 })}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="firstname">First Name:</label>
          <input
            className="p-2"
            type="text"
            id="firstname"
            onChange={(e) => handleInputChange("firstname", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="lastname">Last Name:</label>
          <input
            className="p-2"
            type="text"
            id="lastname"
            onChange={(e) => handleInputChange("lastname", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email Address:</label>
          <input
            className="p-2"
            type="email"
            id="email"
            onChange={(e) => handleInputChange("email", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Phone Number:</label>
          <input
            className="p-2"
            type="text"
            id="phone"
            onChange={(e) => handleInputChange("phone", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">City:</label>
          <input
            className="p-2"
            type="text"
            id="city"
            onChange={(e) => handleInputChange("city", e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Address:</label>
          <input
            className="p-2"
            type="text"
            id="address"
            onChange={(e) => handleInputChange("address", e.target.value)}
            required
          />
        </div>

        {/* Education section */}
        <div className="flex flex-col gap-2">
          <p>Education:</p>
          <div className="flex flex-col">
            {formData.education.map((edu, index) => (
              <div className="flex justify-between flex-wrap" key={index}>
                <input
                  className="p-2"
                  type="text"
                  id={`degree${index}`}
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, "degree", e.target.value)
                  }
                  required
                />
                <input
                  className="p-2"
                  type="text"
                  id={`institute${index}`}
                  placeholder="Institute"
                  value={edu.institute}
                  onChange={(e) =>
                    handleEducationChange(index, "institute", e.target.value)
                  }
                  required
                />
                <input
                  className="p-2"
                  type="text"
                  id={`year${index}`}
                  placeholder="Year"
                  value={edu.year}
                  onChange={(e) =>
                    handleEducationChange(index, "year", e.target.value)
                  }
                  required
                />
                <div>
                  <button
                    type="button"
                    className="text-white bg-blue-700 p-2 rounded-full"
                    onClick={addEducation}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    type="button"
                    className="text-white bg-red-700 p-2 rounded-full"
                    onClick={() => removeEducation(edu.eduId)}
                    disabled={formData.education.length === 1}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills section */}
        <div className="flex flex-col gap-2">
          <p>Skills:</p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              {formData.skills.map((skill, index) => (
                <div className="flex justify-between" key={index}>
                  <input
                    type="text"
                    id={`skill${index}`}
                    className="p-2"
                    value={skill}
                    onChange={(e) => handleSkillsChange(index, e.target.value)}
                    required
                  />
                  <div>
                    <button
                      type="button"
                      className="text-white bg-blue-700 p-2 rounded-full"
                      onClick={addSkill}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 p-2 rounded-full"
                      onClick={() => removeSkill(index)}
                      disabled={formData.skills.length === 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Hobbies section */}
        <div className="flex flex-col gap-2">
          <p>Hobbies</p>
          <div className="flex justify-between">
            <div className="flex flex-col">
              {formData.hobbies.map((hobby, index) => (
                <div className="flex justify-between" key={index}>
                  <input
                    type="text"
                    id={`hobby${index}`}
                    className="p-2"
                    value={hobby}
                    onChange={(e) => handleHobbiesChange(index, e.target.value)}
                    required
                  />
                  <div>
                    <button
                      type="button"
                      className="text-white bg-blue-700 p-2 rounded-full"
                      onClick={addHobby}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 p-2 rounded-full"
                      onClick={() => removeHobby(index)}
                      disabled={formData.hobbies.length === 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience section */}
        <div className="flex flex-col gap-2">
          <p>Experience:</p>
          <div className="flex justify-between flex-wrap">
            <div className="flex flex-col">
              {formData.experience.map((ex, index) => (
                <div className="flex justify-between" key={index}>
                  <input
                    className="p-2"
                    type="text"
                    id={`job${index}`}
                    placeholder="Job Description"
                    onChange={(e) =>
                      handleExperienceChange(index, "job", e.target.value)
                    }
                    required
                  />
                  <input
                    className="p-2"
                    type="text"
                    id={`company${index}`}
                    placeholder="Company"
                    onChange={(e) =>
                      handleExperienceChange(index, "company", e.target.value)
                    }
                    required
                  />
                  <input
                    className="p-2"
                    type="text"
                    id={`duration${index}`}
                    placeholder="Duration"
                    onChange={(e) =>
                      handleExperienceChange(index, "duration", e.target.value)
                    }
                    required
                  />
                  <input
                    className="p-2"
                    type="text"
                    id={`desc${index}`}
                    placeholder="Description"
                    onChange={(e) =>
                      handleExperienceChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    required
                  />
                  <div>
                    <button
                      type="button"
                      className="text-white bg-blue-700 p-2 rounded-full"
                      onClick={addExperience}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </button>
                    <button
                      type="button"
                      className="text-white bg-red-700 p-2 rounded-full"
                      onClick={() => removeExperience(index)}
                      disabled={formData.experience.length === 1}
                    >
                      <FontAwesomeIcon icon={faMinus} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <input className="rounded-full p-2 bg-gray-300" type="submit" />
      </form>
    </div>
  );
};

export default Input;
