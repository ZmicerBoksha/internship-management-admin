import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    backButton: {
      marginRight: theme.spacing(1),
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      display: "flex",
      justifyContent: "center",
    },
    stepper: {
      boxShadow: "1px 1px 1px #dedfe0",
      margin: "40px 0 20px",
    },
    buttonWrapper: {
      display: "flex",
      justifyContent: "center",
      margin: "20px 0 70px",
    },
    info: {
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      margin: "20px 0",
    },
  })
);

function getSteps() {
  return [
    "An interview with HR is scheduled",
    "An interview with HR is finished",
    "The level of English is checked",
    "An interview with TS is scheduled",
    "An interview with TS is finished",
  ];
}

function getStepContent(stepIndex: number) {
  switch (stepIndex) {
    case 0:
      return "The administrator needs to schedule an interview with HR and the candidate";
    case 1:
      return "Leave your feedback about the candidate";
    case 2:
      return "Enter the level of English of the candidate";
    case 3:
      return "The administrator needs to schedule an interview with technical specialist and the candidate";
    case 4:
      return "Leave your feedback about the candidate";
    default:
      return "Unknown stepIndex";
  }
}

const CandidateProgress: React.FC = () => {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className={classes.root}>
      <Stepper
        className={classes.stepper}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div className={classes.info}>
            <Typography>
              All steps completed. Please accept or reject this candidate.
            </Typography>
            <Button
              style={{ margin: "20px 0 40px" }}
              onClick={() => setActiveStep(0)}
            >
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>
              {getStepContent(activeStep)}
            </Typography>
            <div className={classes.buttonWrapper}>
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                className={classes.backButton}
              >
                Back
              </Button>
              <Button variant="contained" color="primary" onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CandidateProgress;
