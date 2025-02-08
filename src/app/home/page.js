import Layout from '../components/layout';
import Tabs from "../components/tabs"
import ListComponent, { CompactListComponent } from '../components/list-component'
import HomeBannerCarousel from '../components/home-banner' 
//import fileOperations from '../components/file-handler'
export const viewport = {
    width : 'device-width', 
    initialScale:1,
    maximumScale:1,
    userScalable:false
  } 
export default function Page() {
    console.log("before file write"); 
    //fileOperations();
    console.log("after file write");
    const tabContent = [{
        label : 'New',
        content : (<><ListComponent heading="Ongoing Activities"/></>)
    },
    {
        label : "Active",
        content : (<><ListComponent heading="Completed Activities"/></>)
    },
    {
        label : "Completed",
        content : (<><ListComponent heading="Upcoming Activities"/></>)
    },
    {
        label : "Liked Videos",
        content : (<><ListComponent heading="Liked Videos"/></>)
    }];
    return (<Layout>
        <div className="flex justify-center items-center"> 
            <ListComponent heading="Today's Excercise"/>
        </div>
    </Layout>);
}