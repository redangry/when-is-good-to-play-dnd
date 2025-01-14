import { Container, Grid, Typography } from "@material-ui/core";
import {
  DatePicker,
  MaterialUiPickersDate,
  TimePicker
} from "@material-ui/pickers";
import { DnDClasses, DnDRaces } from "../constants/dnd";
import React, { useState } from "react";
import reasons, { specialReasons } from "reasons";

import Header from "components/Header";
import dndLogo from "assets/dnd logo.png";
import { getHoliday } from "utils/date";
import { getRandomInt } from "utils";
import useStyles from "./styles";

const App = () => {
  const classes = useStyles();

  const [date, changeDate] = useState<MaterialUiPickersDate>(new Date());
  const [reasonCantPlay, setReasonCantPlay] = useState(
    "Pick a date to see if it is a good day to meet up and play DnD"
  );
  const [success, setSuccess] = useState(false);

  const onAccept = (date: any) => {
    if (getRandomInt(10000) === 1) {
      setSuccess(true);
      return setReasonCantPlay(
        "That day works for everyone!!! Now you'll have to find a time range that works for everyone."
      );
    }
    const randomClass = DnDClasses[getRandomInt(DnDClasses.length)];
    const randomRace =
      randomClass === "DM" ? "" : DnDRaces[getRandomInt(DnDRaces.length)];

    const specialDate = specialReasons[getHoliday(date)];

    const randomReason = specialDate
      ? specialDate[getRandomInt(specialDate.length)]
      : reasons[getRandomInt(reasons.length)];

    setReasonCantPlay(
      `That day doesn't work because your party's ${randomRace} ${randomClass}${randomReason} that day.`
    );

    setSuccess(false);
  };

  return (
    <div>
      <Header />
      <main>
        <Container maxWidth="xs" className={classes.topMargin}>
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <img src={dndLogo} alt="DnD Logo" className={classes.logo} />
            </Grid>
          </Grid>
        </Container>
        <Container
          maxWidth="lg"
          className={`${classes.topMargin} ${classes.bottomMargin}`}
        >
          <Typography align="center" variant="h4" gutterBottom>
            {reasonCantPlay}
          </Typography>
        </Container>
        <Grid container justify="center" alignItems="center">
          <Grid item>
            {success ? (
              <TimePicker
                autoOk
                orientation="landscape"
                variant="static"
                value={date}
                onChange={changeDate}
                onAccept={onAccept}
                disableToolbar
              />
            ) : (
              <DatePicker
                autoOk
                orientation="landscape"
                variant="static"
                openTo="date"
                value={date}
                onChange={changeDate}
                onAccept={onAccept}
                disableToolbar
                disablePast
              />
            )}
          </Grid>
        </Grid>
      </main>
    </div>
  );
};

export default App;
