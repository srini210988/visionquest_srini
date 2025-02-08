import { Button } from "@/components/ui/button"

import Layout from '../components/layout';
import Switch from '../components/switch'
export default function Page() {
    
    return (<Layout>
        <div>
            <h2 className="text-left font-black">SETTINGS</h2>
        </div>
        <div className="flex settings-container flex-col items-start">
        <Switch size="sm" label="Enable Notification"  />
        {/*<Switch size="sm" label="Set Reminder" icon="AlarmClockPlus"/>
        <Switch size="sm" label="Enable Notification"  />
        <Switch size="sm" label="Theme Dark Mode" icon="Palette"/>*/}
        </div>
    </Layout>);
}