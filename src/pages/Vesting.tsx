import UpcomingVests from "../features/vesting/UpcomingVests";
import VestingCalendar from "../features/vesting/VestingCalendar";
import VestedVsUnvested from "../features/vesting/VestedVsUnvested";

export default function VestingPage() {
  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Vesting Timeline</h1>
      <UpcomingVests />
      <VestingCalendar />
      <VestedVsUnvested />
    </div>
  );
}
