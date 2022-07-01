/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useEffect, useState } from 'react';
import { Grid,Drawer, IconButton,Switch,BottomNavigation,Button} from '@mui/material';
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';
import clsx from 'clsx';
import styles from '../../../../../../assests/scss/campaign.module.scss';
import { getScreenshotUploadData } from '../../../../../../graphs/getScreenshotUploadData';
import { useQuery } from 'react-query';


type ReportingDrawerProp = {
  handleClick: Function,
  value:any
  // campaignReportS3Data: CMCReportv3S3Data | null,
  open:boolean
};

const ReportingDrawer: React.FC<ReportingDrawerProp> = ({
  open,
  handleClick,
  value,
  // campaignReportS3Data,
}) => {
  const {query:{campaignId}} = useRouter();
  const { data: keywords } = useQuery('keywords', () => getScreenshotUploadData(`${campaignId}_${value['title']}_${value['category']}_${value['name']}`, 100),{});
  useEffect(() => {
    
  }, [value]);
  // const list = keywords?.filter((brand) => brand );
  return (
       !value?<></>:
       <Drawer  open={open} anchor="right">
        <Grid style={{paddingLeft:'8px',paddingRight:'8px'}}>
          <Grid className={styles.Report_drawer_title}>
            <Grid className={styles.Reporting_title}>
              REFERENCE CONVERSATIONS
            </Grid>
              <Grid onClick={()=>{handleClick()}}>
                <IconButton aria-label="delete" color="default" >
                  <ClearIcon style={{fontSize:'16px', color:"black"}}/>
                </IconButton>
              </Grid>
          </Grid>
          <Grid className={styles.drawer_compagin}>
            <Grid >
              <Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justifyContent="flex-center"
                    alignItems="flex-center"
                  >
                    <Grid item className={styles.campaign}>
                      {value['name']+"-"+value['percent']}
                    </Grid>
                    <Grid
                      item
                      className={styles.drawer_edit}
                    >
                      Edit
                    </Grid>
                    <Grid
                      className={styles.drawer_icon}
                      item
                    >
                      <img className={styles.pen} src="/images/pen.jpg" />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={styles.Reporting_title}>
                {value['title']+" | "+value['category']}
                </Grid>
              </Grid>
            </Grid>
            <Switch
              defaultChecked
              inputProps={{ 'aria-label': 'checkbox with default color' }}
            />
          </Grid>
          <Grid item className={styles.Reporting_divider} />
          <Grid className={styles.Report_drawer}>
            {
              keywords?.items?.map((element,index)=><Grid key={index} className={styles.drawer_map}>
                <Grid className={styles.campaign_map}>
                {`${element?.groupName}`}
                </Grid>
                <Grid className={styles.Reporting_title}>
                  {`${element?.type} | ${element?.updatedAtUTC}`}
                </Grid>
                <Grid className={styles.drawer_image}>
                  <img  src={element?.s3Key}></img>
                </Grid>
                <Grid item className={styles.Reporting_divider_map} />
              </Grid>)
            }
          </Grid>
          <Grid className={styles.drawer_button}>
          <Grid item className={styles.Reporting_divider} />
            <Button variant="outlined" disableElevation className={styles.drawer_button_inside}>
              Upload ScreenShot
            </Button>
          </Grid>
        </Grid>
      </Drawer>
  );
}

export default ReportingDrawer;
