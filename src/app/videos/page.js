import { Button } from "@/components/ui/button"
import Layout from '../components/layout';
import DayExercisesPage from '../components/exercise-planner'
export default function Page() {
    return (<Layout>
        <div className="flex justify-center items-center">
            <DayExercisesPage/>
        </div>
    </Layout>);
}