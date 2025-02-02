import { Button } from "@/components/ui/button"
import Layout from '../components/layout';
import { Loader2, RefreshCw, Circle, Spinner } from 'lucide-react'
import StatisticsCard from '../components/statics-card' 
import { ProgressProvider } from "../context/progress-provider";
export default function Page() {
    return (<Layout> 
        <ProgressProvider>
        <div className="flex justify-center items-center"> 
            <div> 
            <StatisticsCard />
            </div>
        </div>
        </ProgressProvider>
    </Layout>);
}