import './App.css';
import TopBar from './components/TopBar';
import LeftPane from './components/LeftPane';
import RightPane from './components/RightPane';

const ViewClaimsPage = () => {
  return (
    <div className="h-screen bg-gray-50">
      <TopBar />

      {/* Main content area */}
      <main className="flex flex-col md:flex-row gap-2 md:gap-0 w-full h-full flex-1">


        <div className="overflow-auto w-full max-w-md flex-shrink-0">
          <LeftPane />
        </div>

        <div className="flex-1 min-w-0 overflow-auto">
          <RightPane />
        </div>

      </main>
    </div>
  );
}

export default ViewClaimsPage;
