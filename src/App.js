import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home Page/Home';
import StudentSignup from './components/SignUpPage/Student/SignUp';
import StaffSignup from './components/SignUpPage/Staff/SignUp';
import Login from './components/LoginPage/Login';
import CreateGroup from './components/CreateGroupPage/CreateGroup';
import Supervisor from './components/Supervisor/Supervisor';
import RequestSuperVisor from './components/RequestSupervisorPage/RequestSupervisor';
import RequestCoSuperVisor from './components/RequestCoSupervisorPage/RequestCoSupervisor';
import SubmitDocuments from './components/SubmitDocuments/SubmitDocuments';
import GroupDetails from './components/GroupDetails/GroupDetails';
import ManageStudents from './components/AdminPage/ManageStudents';

import DownloadTemplate from './components/DownloadTemplates/DownloadTemplates';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';

import ManageStaff from './components/AdminPage/ManageStaff';
import AllocatePanel from './components/AdminPage/AllocatePanelMembers/AllocatePanel';
import CreateSubmissionTypes from './components/AdminPage/CreateSubmissionType/CreateSubmissionType';
import MarkingSchemes from './components/AdminPage/MarkingScheme/MarkingSchemes';
import UploadDocuments from './components/AdminPage/UploadDocuments/UploadDocuments';
import CoSupervisorRequests from './components/CoSupervisorRequests/CoSupervisorRequests';
import SubmitTopic from './components/SubmitTopic/SubmitTopic';
import EvaluateTopic from './components/EvaluateTopic/EvaluateTopic';
import GroupChat from './components/StaffChat/GroupChat';

function App() {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/student-register" element={<StudentSignup />} />
                    <Route path="/staff-register" element={<StaffSignup />} />
                    <Route path="/login" element={<Login />} />

                    <Route path="/create-group" element={<ProtectedRoute><CreateGroup/></ProtectedRoute>} />

                    <Route path="/request-supervisor" element={<ProtectedRoute><RequestSuperVisor/></ProtectedRoute>} />
                    <Route path="/request-cosupervisor" element={<ProtectedRoute><RequestCoSuperVisor/></ProtectedRoute>} />
                    <Route path="/submit-doc" element={<ProtectedRoute><SubmitDocuments/></ProtectedRoute>} />
                    <Route path="/group-details" element={<ProtectedRoute><GroupDetails /></ProtectedRoute>} />
                    <Route path="/download-templates" element={<ProtectedRoute><DownloadTemplate/></ProtectedRoute>} />
                    <Route path="/submit-topic" element={<ProtectedRoute><SubmitTopic/></ProtectedRoute>} />

                    {/* admin */}
                    <Route path="/manage-students" element={<ProtectedRoute><ManageStudents /></ProtectedRoute>} />
                    <Route path="/manage-staff" element={<ProtectedRoute><ManageStaff /></ProtectedRoute>} />
                    <Route path="/allocate-panel" element={<ProtectedRoute><AllocatePanel /></ProtectedRoute>} />
                    <Route path="/submission-type" element={<ProtectedRoute><CreateSubmissionTypes /></ProtectedRoute>} />
                    <Route path="/upload-templates" element={<ProtectedRoute><UploadDocuments /></ProtectedRoute>} />

                    {/* staff */}
                    <Route path="/supervisor" element={<ProtectedRoute><Supervisor /></ProtectedRoute>} />
                    <Route path="/cosupervisor" element={<ProtectedRoute><CoSupervisorRequests/></ProtectedRoute>} />
                    <Route path="/evaluate-topics" element={<ProtectedRoute><EvaluateTopic/></ProtectedRoute>} />
                    {/* <Route path="/chat" element={<ProtectedRoute><GroupChat/></ProtectedRoute>} /> */}


                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
