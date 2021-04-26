import { createStyles, makeStyles } from "@material-ui/core";
import { FunctionComponent } from "react"


const useStyles = makeStyles(() => {
  return createStyles({
    "@global": {
      "@keyframes rush_01": {
        "from": {
          transform: "translate(0)"
        },    
        "25%": {
          transform: "translate(100%)"
        },
        '50%': {
          transform: "translate(100%, 100%)"
        },    
        '75%': {
          transform: "translate(0, 100%)"
        }
      },
      "@keyframes rush_02": {
        "from": {
          transform: "translate(0)"
        },    
        "25%": {
          transform: "translate(0, 100%)"
        },   
        "50%": {
          transform: "translate(-100%, 100%)"
        },    
        "75%": {
          transform: "translate(-100%, 0)"
        }
      },       
      "@keyframes rush_03": {
        "from": {
          transform: "translate(0)"
        },    
        "25%": {
          transform: "translate(0, -100%)"
        },    
        "50%": {
          transform: "translate(100%, -100%)"
        },    
        "75%": {
          transform: "translate(100%)"
        }
      },
      "@keyframes rush_04": {
        "from": {
          transform: "translate(0)"
        },    
        "25%": {
          transform: "translate(-100%, 0)"
        },    
        "50%": {
          transform: "translate(-100%, -100%)"
        },    
        "75%": {
          transform: "translate(0, -100%)"
        }
      }, 
    },  
    cubes_wrap: {
      display: 'grid',
      gridTemplateColumns: '40px 40px',
      gridTemplateRows: '40px 40px',
      justifyContent: 'center',
      alignContent: 'center',
      '& div': {
        width: 40,
        height: 40
      }
    },
    cube_01: {
      animation: "rush_01 4s infinite",
      backgroundColor: "#c0f0b9"
    },
    cube_02: {
      animation: "rush_02 4s infinite",
      backgroundColor: "#f0d8ad"      
    },
    cube_03: {
      animation: "rush_03 4s infinite",
      backgroundColor: "#f0addb"      
    },
    cube_04: {
      animation: "rush_04 4s infinite",
      backgroundColor: "#c4d8f0"      
    },
  })
})

const Preloader: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.cubes_wrap}>
      <div className={classes.cube_01}></div>
      <div className={classes.cube_02}></div>
      <div className={classes.cube_03}></div>
      <div className={classes.cube_04}></div>
    </div>
  )
}

export default Preloader