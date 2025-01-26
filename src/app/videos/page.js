import { Button } from "@/components/ui/button"
import Layout from '../components/layout';
export default function Page() {
    return (<Layout>
        <div className="flex justify-center items-center">
            <div>
                <Button className="bg-red-600">This is Videos container</Button>
            </div>
        </div>
    </Layout>);
}