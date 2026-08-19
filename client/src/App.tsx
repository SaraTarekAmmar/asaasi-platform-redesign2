/* Editorial operating system: public discovery stays open, while member actions live in a persistent navy-and-saffron operational workspace. */
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "@/components/ErrorBoundary";
import Home from "@/pages/Home";
import Connect from "./pages/Connect";
import Community, { CommunityPost } from "./pages/Community";
import Events from "./pages/Events";
import Learn from "./pages/Learn";
import Tools from "./pages/Tools";
import Pricing from "./pages/Pricing";
import OperatingModel from "./pages/OperatingModel";
import Support from "./pages/Support";
import RoadmapStagePage, { RoadmapCoursePage } from "./pages/RoadmapStage";
import { Dashboard, LearnerWorkspace, CoachWorkspace, ProfileWorkspace, SavedWorkspace, SettingsWorkspace, NotificationsWorkspace, LoginFlow, SignupFlow, RequestFlow, MatchingWorkspace, OrganizationFlow, EventFlow, ToolFlow, RecoveryFlow, FollowingWorkspace, InvitationsWorkspace, BillingWorkspace, AssessmentWorkspace, KnowledgeWorkspace, ContactFlow } from "./pages/ProductFlows";
import { ApplicationsPage, AdminWorkspacePage, CommercialPage, ContentIndexPage, DemoDayPage, DirectoryPage, HostEventPage, InformationPage, MemberProfilePage, MembershipHubPage, OrganizationHubPage, PerksPublicPage, PublicDetailPage, RegistrationsPage, RequestBrowsePage, RequestDetailPage, SystemStatePage, WebinarsPage, WorkshopsPage, WorkspaceCommunityPage, WorkspaceDirectoryPage, WorkspaceEventsPage, WorkspaceRequestsPage } from "./pages/MissingPages";
import "./product-flows.css";
import "./missing-pages.css";
import "./ux-system.css";
import "./craft-refinement.css";
import "./pathways.css";
import "./product-enhancements.css";
import "./flint-landing.css";
import "./flint-workspace.css";
import "./tool-access-refinement.css";
import "./commercial-contact-refinement.css";
import "./discovery-content-refinement.css";
import "./account-access-refinement.css";
import { SiteShell } from "./components/site";

function Router() {
  return <Switch>
    <Route path="/" component={Home} />
    <Route path="/login" component={LoginFlow} />
    <Route path="/signup" component={SignupFlow} />
    <Route path="/forgot-password" component={() => <RecoveryFlow mode="forgot" />} />
    <Route path="/reset-password" component={() => <RecoveryFlow mode="reset" />} />
    <Route path="/verify-email" component={() => <RecoveryFlow mode="verify" />} />

    <Route path="/dashboard/home" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/dashboard/learner/courses" component={LearnerWorkspace} />
    <Route path="/dashboard/learner/live" component={LearnerWorkspace} />
    <Route path="/dashboard/learner/knowledge" component={KnowledgeWorkspace} />
    <Route path="/dashboard/learner/progress" component={LearnerWorkspace} />
    <Route path="/dashboard/progress" component={LearnerWorkspace} />
    <Route path="/dashboard/learner" component={LearnerWorkspace} />
    <Route path="/dashboard/coach/sessions" component={CoachWorkspace} />
    <Route path="/dashboard/coach/history" component={CoachWorkspace} />
    <Route path="/dashboard/coach" component={CoachWorkspace} />
    <Route path="/dashboard/network" component={() => <WorkspaceDirectoryPage />} />
    <Route path="/dashboard/discussions" component={WorkspaceCommunityPage} />
    <Route path="/dashboard/professionals" component={() => <WorkspaceDirectoryPage professionals />} />
    <Route path="/dashboard/members/:id" component={() => <MemberProfilePage workspace />} />
    <Route path="/dashboard/events/:slug" component={EventFlow} />
    <Route path="/dashboard/rooms" component={() => <WorkspaceEventsPage discovery />} />
    <Route path="/dashboard/events" component={() => <WorkspaceEventsPage />} />
    <Route path="/dashboard/registrations" component={RegistrationsPage} />
    <Route path="/dashboard/requests/:id" component={() => <RequestDetailPage workspace />} />
    <Route path="/dashboard/requests" component={WorkspaceRequestsPage} />
    <Route path="/dashboard/organizations" component={OrganizationHubPage} />
    <Route path="/dashboard/profile" component={ProfileWorkspace} />
    <Route path="/dashboard/saved" component={SavedWorkspace} />
    <Route path="/dashboard/following" component={FollowingWorkspace} />
    <Route path="/dashboard/invitations" component={InvitationsWorkspace} />
    <Route path="/dashboard/billing" component={BillingWorkspace} />
    <Route path="/dashboard/perks" component={() => <MembershipHubPage />} />
    <Route path="/dashboard/assessment" component={AssessmentWorkspace} />
    <Route path="/assessment" component={AssessmentWorkspace} />
    <Route path="/dashboard/settings" component={SettingsWorkspace} />
    <Route path="/dashboard/notifications" component={NotificationsWorkspace} />
    <Route path="/admin" component={AdminWorkspacePage} />

    <Route path="/knowledge" component={KnowledgeWorkspace} />
    <Route path="/matching" component={MatchingWorkspace} />
    <Route path="/requests/new" component={RequestFlow} />
    <Route path="/requests/browse" component={RequestBrowsePage} />
    <Route path="/requests/:id" component={() => <RequestDetailPage />} />
    <Route path="/organizations/new" component={() => <OrganizationFlow mode="new" />} />
    <Route path="/organizations/join" component={() => <OrganizationFlow mode="join" />} />
    <Route path="/organizations/workspace" component={() => <OrganizationFlow mode="workspace" />} />
    <Route path="/events/host" component={() => <HostEventPage />} />
    <Route path="/events/:slug" component={EventFlow} />
    <Route path="/events" component={Events} />

    <Route path="/connect" component={Connect} />
    <Route path="/directory" component={() => <DirectoryPage />} />
    <Route path="/search" component={() => <DirectoryPage gated />} />
    <Route path="/members/:id" component={() => <MemberProfilePage />} />
    <Route path="/members" component={Connect} />
    <Route path="/mentors" component={() => <DirectoryPage kind="mentors" />} />
    <Route path="/providers" component={() => <DirectoryPage kind="providers" />} />
    <Route path="/startups" component={() => <DirectoryPage kind="startups" />} />
    <Route path="/community" component={Community} />
<Route path="/community/:id" component={CommunityPost} />
    <Route path="/groups/:slug" component={() => <PublicDetailPage type="group" />} />
    <Route path="/groups" component={Connect} />
    <Route path="/learn" component={Learn} />
    <Route path="/roadmap/:stage" component={RoadmapStagePage} />
    <Route path="/articles/:slug" component={() => <PublicDetailPage type="article" />} />
    <Route path="/articles" component={() => <ContentIndexPage kind="article" />} />
    <Route path="/podcasts/:slug" component={() => <PublicDetailPage type="podcast" />} />
    <Route path="/podcasts" component={() => <ContentIndexPage kind="podcast" />} />
    <Route path="/webinars/:slug" component={() => <PublicDetailPage type="webinar" gated />} />
    <Route path="/webinars" component={() => <WebinarsPage />} />
    <Route path="/courses/roadmap-validation" component={() => <RoadmapCoursePage stageSlug="validation" />} />
    <Route path="/courses/roadmap-mvp" component={() => <RoadmapCoursePage stageSlug="mvp" />} />
    <Route path="/courses/roadmap-acquisition" component={() => <RoadmapCoursePage stageSlug="acquisition" />} />
    <Route path="/courses/roadmap-retention" component={() => <RoadmapCoursePage stageSlug="retention" />} />
    <Route path="/courses/roadmap-focus" component={() => <RoadmapCoursePage stageSlug="focus" />} />
    <Route path="/courses/roadmap-scale" component={() => <RoadmapCoursePage stageSlug="scale" />} />
    <Route path="/courses/roadmap-governance" component={() => <RoadmapCoursePage stageSlug="governance" />} />
    <Route path="/courses/:slug" component={() => <PublicDetailPage type="course" />} />
    <Route path="/playbooks" component={() => <PublicDetailPage type="course" gated />} />
    <Route path="/videos" component={() => <PublicDetailPage type="article" />} />
    <Route path="/stories" component={() => <PublicDetailPage type="story" />} />
    <Route path="/tools/:slug" component={ToolFlow} />
    <Route path="/tools" component={Tools} />
    <Route path="/perks" component={PerksPublicPage} />
    <Route path="/workshops" component={() => <WorkshopsPage />} />
    <Route path="/membership" component={Pricing} />
    <Route path="/pricing" component={Pricing} />
    <Route path="/operating-model" component={OperatingModel} />

    <Route path="/sponsors" component={() => <CommercialPage kind="sponsors" />} />
    <Route path="/featured" component={() => <CommercialPage kind="featured" />} />
    <Route path="/partners" component={() => <CommercialPage kind="partners" />} />
    <Route path="/sponsorship" component={() => <CommercialPage kind="sponsors" />} />
    <Route path="/applications" component={() => <ApplicationsPage />} />
    <Route path="/providers/join" component={() => <ApplicationsPage kind="provider" />} />
    <Route path="/demo-day" component={() => <DemoDayPage />} />

    <Route path="/contact" component={ContactFlow} />
    <Route path="/support" component={Support} />
    <Route path="/about" component={() => <InformationPage kind="about" />} />
    <Route path="/privacy" component={() => <InformationPage kind="privacy" />} />
    <Route path="/terms" component={() => <InformationPage kind="terms" />} />
    <Route path="/accessibility" component={() => <InformationPage kind="accessibility" />} />
    <Route path="/403" component={() => <SystemStatePage code="403" />} />
    <Route path="/429" component={() => <SystemStatePage code="429" />} />
    <Route path="/500" component={() => <SystemStatePage code="500" />} />
    <Route path="/offline" component={() => <SystemStatePage code="offline" />} />
    <Route path="/maintenance" component={() => <SystemStatePage code="maintenance" />} />
    <Route path="/invitation/expired" component={() => <SystemStatePage code="invitation-expired" />} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch>;
}

export default function App() {
  return <ErrorBoundary><SiteShell><Router /></SiteShell></ErrorBoundary>;
}
