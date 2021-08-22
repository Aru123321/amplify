import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    margin: "15px 0px",
    boxShadow: "none",
    border: "1px solid #DDD",
    borderRadius: 10,
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 30,
  },
  pos: {
    marginBottom: 12,
    fontSize: 14,
    color: "white"
  },
});

export default function   SimpleCard(props) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


  const cardStyle = (data) => {
    const date = data.createdAt;
    const date1 = new Date(date);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    const status = data.status;
    const isContacted = data.volunteers.length>0;

    if(status == "open" && isContacted){
      return {
        backgroundColor: "#3bb78f",
        backgroundImage: "linear-gradient(315deg, #3bb78f 0%, #0bab64 74%)"
      }
    }else if(status == "open" && !isContacted && diffDays<3){
      return {
        backgroundColor: "#3f0d12",
        backgroundImage: "linear-gradient(315deg, #3f0d12 0%, #a71d31 74%)"
      }
    }else if(status == "open" && !isContacted && diffDays>=3){
      return {
        "backgroundColor": "#f5d020",
        "backgroundImage": "linear-gradient(315deg, #f5d020 0%, #f53803 74%)"
      }
    }

  }

  return (
    <Card className={classes.root} style={cardStyle(props.cardInfo)} onClick={() => props.onClick(props.cardInfo)}>
      <CardContent style={{paddingBottom: 5}}>
        <Typography style={{flex: 1, color: "white"}} className={classes.title} color="textSecondary" gutterBottom>
          {props.cardInfo.patient_name}
        </Typography>
        <Typography style={{fontSize: "18px", color: "white"}}>
          {props.cardInfo.category && props.cardInfo.category.category_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.cardInfo.locality && props.cardInfo.locality.city.city} | {props.cardInfo.locality && props.cardInfo.locality.locality_name}
        </Typography>
      </CardContent>
      <Divider />
      <CardActions style={{padding: 16, paddingBottom: 5}}>
          <div style={{display: "flex", flex: 1}}>
          <Typography style={{flex: 1, color: "white"}} className={classes.title} color="textSecondary" gutterBottom>
            Open Since: {(new Date(props.cardInfo.createdAt)).toDateString().substring(4)}
        </Typography>
        </div>
      </CardActions>
    </Card>
  );
}