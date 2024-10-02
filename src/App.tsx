import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'; // react-query 추가
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import DashboardPage from "./pages/DashboardPage";
import SearchProductPage from "./pages/SearchProductPage";
import SearchResultPage from "./pages/SearchResultPage";
import NotificationPage from "./pages/NotificationPage";
import LoginPage from "./pages/LoginPage";
import KakaoAuth from './services/KakaoAuth';
import NaverAuth from './services/NaverAuth';
import SignUpPage from "./pages/SignUpPage";
import FindIdPage from "./pages/FindIdPage";
import FindPwdPage from "./pages/FindPwdPage";
import Navbar from "./components/Navbar";

// QueryClient 생성
const queryClient = new QueryClient();

function App() {
  return (
    // QueryClientProvider로 앱 전체를 감쌈
    <QueryClientProvider client={queryClient}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/searchpage" element={<SearchProductPage />} />
          <Route path="/dashboardpage" element={<DashboardPage />} />
          <Route path="/searchresult" element={<SearchResultPage />} />
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/auth/kakao" element={<KakaoAuth />} />
          <Route path="/auth/naver" element={<NaverAuth />} />
          <Route path="/findid" element={<FindIdPage />} />
          <Route path="/findpwd" element={<FindPwdPage />} />
          <Route path="/signup" element={<SignUpPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
