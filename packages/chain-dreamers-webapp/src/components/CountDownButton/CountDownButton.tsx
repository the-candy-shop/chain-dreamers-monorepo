import React from 'react';
import Button from '@mui/material/Button';
import dayjs, { Dayjs } from "dayjs";

const launchDate = dayjs('2022-01-30');

function CountDownButton() {
  const [now, setNow] = React.useState<Dayjs>(dayjs());

  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hoursFromLaunch = launchDate.diff(now, 'hour');
  const daysFromLaunch = Math.floor(hoursFromLaunch / 24);
  const andHoursFromLaunch = hoursFromLaunch - (daysFromLaunch * 24);

  return (
    <Button sx={{
      fontWeight: 600,
      fontSize: '16px',
      lineHeight: '19px',
      color: '#44DFFD',
      padding: '12px 24px',
      marginLeft: '20px',
      border: '1px solid #AC0BF7',
      borderRadius: '4px',
      textTransform: 'none',
    }}>
      {daysFromLaunch} Days {andHoursFromLaunch} hours before opening
    </Button>
  );
}

export default CountDownButton;
