import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faLocationDot,
  faMapLocationDot,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Output = () => {
  const {
    image,
    firstname,
    lastname,
    phone,
    email,
    city,
    address,
    education,
    experience,
    skills,
    hobbies,
  } = JSON.parse(localStorage.getItem("data"));

  return (
    <>
      <div className="flex flex-col">
        <Link to="/">Back to Form</Link>
      </div>
      <div className="flex flex-col border-2 border-[#dddddd] p-12 gap-12">
        <div className="flex justify-between items-center">
          <h1 className="text-5xl font-semibold">
            {firstname} {lastname}
          </h1>
          <div className="flex flex-col">
            <div className="flex items-center text-[#4e4e4e] gap-4">
              <FontAwesomeIcon className="text-lg" icon={faPhone} />
              <p>{phone}</p>
            </div>
            <div className="flex items-center text-[#4e4e4e] gap-4">
              <FontAwesomeIcon className="text-lg" icon={faLocationDot} />
              <p>{address}</p>
            </div>
            <div className="flex items-center text-[#4e4e4e] gap-4">
              <FontAwesomeIcon className="text-lg" icon={faMapLocationDot} />
              <p>{city}</p>
            </div>
            <div className="flex items-center text-[#4e4e4e] gap-4">
              <FontAwesomeIcon className="text-lg" icon={faEnvelope} />
              <p>{email}</p>
            </div>
          </div>
          <img src={image} className="w-1/12" alt="cv pic" />
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold">Education</h2>
          <table className="text-3xl">
            <thead>
              <tr>
                <th>Degree</th>
                <th>Institute</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {education.map((edu, index) => {
                return (
                  <tr key={index}>
                    <td>{edu.degree}</td>
                    <td>{edu.institute}</td>
                    <td>{edu.year}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold">Experience</h2>
          <table className="text-3xl">
            <thead>
              <tr>
                <th>Job</th>
                <th>Company</th>
                <th>Duration</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {experience.map((ex, index) => {
                return (
                  <tr key={index}>
                    <td>{ex.job}</td>
                    <td>{ex.company}</td>
                    <td>{ex.duration}</td>
                    <td>{ex.description}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold">Skills</h2>
          <h3 className="text-3xl">
            {skills.map((skill, index) => {
              return <li key={index}>{skill}</li>;
            })}
          </h3>
        </div>
        <div className="flex flex-col">
          <h2 className="text-4xl font-semibold">Hobbies</h2>
          <h3 className="text-3xl">
            {hobbies.map((hobby, index) => {
              return <li key={index}>{hobby}</li>;
            })}
          </h3>
        </div>
      </div>
    </>
  );
};

export default Output;
