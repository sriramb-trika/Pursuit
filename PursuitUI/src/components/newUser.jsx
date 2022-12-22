import StepProgressBar from 'react-step-progress';
import "react-step-progress/dist/index.css";
import NewUser from './Recruiter/AddCandidateDetails';
import ScheduleInterview from './Recruiter/scheduleInterview';

export default function Candidate(props) {
 const step1Content = <NewUser setShowModal={props.setShowModal}/> ;
//const step1Content = <div className=' border border-black w-full my-3 h-96'></div>
  const step2Content =<ScheduleInterview/>;
  const step3Content = <h1></h1>;

  // setup step validators, will be called before proceeding to the next step
  function step2Validator() {
    return true;
  }

  function step3Validator() {
    // return a boolean
  }
  return (
    <div className=" bg-white">
      <StepProgressBar 
        startingStep={0}
        steps={[
          {
            label: "Round - 1",
            name: " Round - 1",
            content: step1Content,
            validator: step2Validator
          },
          {
            label: "Round - 2",
            name: "Round - 2",
            content: step2Content,
            validator: step2Validator
          },
          {
            label: "Round",
            name: "Managerial Round",
            content: step3Content,
            validator: step2Validator
          },
          {
            label: "Finish",
            name: "Finish",
            content: step3Content
          }
        ]}
      />
    </div>
  );
}