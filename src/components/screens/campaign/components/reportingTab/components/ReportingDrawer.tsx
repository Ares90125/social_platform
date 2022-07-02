/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, {ChangeEvent, useEffect, useState } from 'react';
import { Grid,Drawer, IconButton,Switch,Button, Select, MenuItem, InputLabel,FormControl,RadioGroup,FormLabel,FormControlLabel,Radio,TextField } from '@mui/material';
import { useRouter } from 'next/router';
import ClearIcon from '@mui/icons-material/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
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
  const [imageurl,setImageurl]=useState<any | null>("");
  const [image, setImage] = useState<any | null>(null);
  const handleSetImage = (event: ChangeEvent<HTMLInputElement>) => {
      if(event.target.files?.length!=0){
          setImage(event.target.files![0]);
          setImageurl(URL.createObjectURL(event.target.files![0]));
      }
  };
  const [age, setAge] = React.useState('');
  const [upload, setUpload]=useState(false);
  const {query:{campaignId}} = useRouter();
  const { data: keywords } = useQuery('keywords', () => getScreenshotUploadData(`${campaignId}_${value['title']}_${category()}_${value['name']}`, 100),{});
  useEffect(() => {
    
  }, [value]);
  const category=()=>{
    if(value['title']=="Engagement Insights"){
      return value['category'].toLowerCase();
    }
    if(value['title']=='Brand Sentiment')
    {
       switch(value['category']){
         case "Pre-Campaign": return 'preSOV';
         case "During-Campaign": return 'duringSOV';
         case "Post-Campaign": return 'afterSOV';
       }
    }
    return value['category'];
  }
  // const list = keywords?.filter((brand) => brand );
  return (
       !value?<></>:
       <Drawer  open={open} anchor="right">
        {!upload?
        <Grid className={styles.screen_upload}>
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
            <Button variant="outlined" disableElevation className={styles.drawer_button_inside} onClick={()=>{setUpload(true)}}>
              Upload ScreenShot
            </Button>
          </Grid>
        </Grid>
        :
        <Grid className={styles.screen_upload}>
          <Grid className={styles.Report_upload_title}>
              <Grid onClick={()=>{setUpload(false)}}>
                <IconButton aria-label="delete" color="default" >
                  <ArrowBackIcon style={{fontSize:'16px', color:"black"}}/>
                </IconButton>
              </Grid>
              <Grid className={styles.Reporting_title}>
                Upload Screenshot
              </Grid>
          </Grid>
          <Grid item className={styles.Reporting_divider} />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Select a Group</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={age}
              label="Select a Group"
              onChange={(event)=>{setAge(event.target.value);}}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <FormControl>
          <FormLabel id="demo-radio-buttons-group-label" className={styles.Reporting_title}>Comment/Post</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              name="radio-buttons-group"
            >
              <FormControlLabel value="Comment" control={<Radio size="small" />} label="Comment" />
              <FormControlLabel value="Post" control={<Radio size="small" />} label="Post" />
            </RadioGroup>
          </FormControl>
          <Grid className={styles.Reporting_title}>Screenshot</Grid>
          <label  htmlFor="image_upload">
            {
                (imageurl!="")?
                <Grid className={styles.drawer_fileUpload}>
                  <img src={imageurl} alt="" className={styles.drawer_images}/>
                </Grid>:
                <Grid className={styles.drawer_fileUpload}>
                    <Grid>
                      Upload Image
                    </Grid>
                </Grid>
            }
            <Grid>
              <input type="file" style={{opacity:0,width:0}} id="image_upload" accept=".gif,.jpg,.jpeg,.png" onChange={(e) => {handleSetImage(e);}}/>
            </Grid>
          </label>
          <Grid className={styles.Reporting_title}>Post/Comment fbPermLink</Grid>
          <TextField id="margin-none" size="small" placeholder="Add the fbPermLink for the post/comment" onChange={(value)=>{}} variant="outlined" className={styles.inputtext}/>
          <Grid className={styles.drawer_button}>
            <Grid item className={styles.Reporting_divider} />
            <Button variant="outlined" disableElevation className={styles.drawer_button_save} onClick={()=>{setUpload(true)}}>
              cancel
            </Button>
            <Button variant="contained" color="primary" disableElevation disabled className={styles.drawer_button_save} onClick={()=>{setUpload(true)}}>
              save
            </Button>
          </Grid>
        </Grid>}
      </Drawer>
  );
}

export default ReportingDrawer;
