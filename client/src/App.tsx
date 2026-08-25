/* Editorial operating system: public discovery stays open, while member actions live in a persistent navy-and-saffron operational workspace. */
import { lazy, Suspense, type ComponentType } from "react";
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

// ponytail: ProductFlows.tsx and MissingPages.tsx together account for most of the app's route
// components (~46 of them) and were the biggest single contributor to the >500kB JS chunk vite
// flagged on every build - a landing-page visitor was downloading the entire authenticated
// dashboard/tools/workspace code before ever needing it. lazyNamed splits each of those two
// files into its own chunk, fetched only once a route that actually needs it is visited, instead
// of restructuring the ~90-route Switch below (which is the riskier change).
function lazyNamed<T extends ComponentType<any>>(loader: () => Promise<Record<string, unknown>>, name: string) {
  return lazy(async () => ({ default: (await loader())[name] as T }));
}
const Dashboard = lazyNamed(() => import("./pages/ProductFlows"), "Dashboard");
const DecisionReviewWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "DecisionReviewWorkspace");
const LearnerWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "LearnerWorkspace");
const CoachWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "CoachWorkspace");
const ProfileWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "ProfileWorkspace");
const SavedWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "SavedWorkspace");
const SettingsWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "SettingsWorkspace");
const NotificationsWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "NotificationsWorkspace");
const LoginFlow = lazyNamed(() => import("./pages/ProductFlows"), "LoginFlow");
const SignupFlow = lazyNamed(() => import("./pages/ProductFlows"), "SignupFlow");
const RequestFlow = lazyNamed(() => import("./pages/ProductFlows"), "RequestFlow");
const MatchingWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "MatchingWorkspace");
const OrganizationFlow = lazyNamed(() => import("./pages/ProductFlows"), "OrganizationFlow");
const EventFlow = lazyNamed(() => import("./pages/ProductFlows"), "EventFlow");
const ToolFlow = lazyNamed(() => import("./pages/ProductFlows"), "ToolFlow");
const RecoveryFlow = lazyNamed(() => import("./pages/ProductFlows"), "RecoveryFlow");
const FollowingWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "FollowingWorkspace");
const InvitationsWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "InvitationsWorkspace");
const BillingWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "BillingWorkspace");
const AssessmentWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "AssessmentWorkspace");
const KnowledgeWorkspace = lazyNamed(() => import("./pages/ProductFlows"), "KnowledgeWorkspace");
const ContactFlow = lazyNamed(() => import("./pages/ProductFlows"), "ContactFlow");
const ApplicationsPage = lazyNamed(() => import("./pages/MissingPages"), "ApplicationsPage");
const AdminWorkspacePage = lazyNamed(() => import("./pages/MissingPages"), "AdminWorkspacePage");
const CommercialPage = lazyNamed(() => import("./pages/MissingPages"), "CommercialPage");
const ContentIndexPage = lazyNamed(() => import("./pages/MissingPages"), "ContentIndexPage");
const DemoDayPage = lazyNamed(() => import("./pages/MissingPages"), "DemoDayPage");
const DirectoryPage = lazyNamed(() => import("./pages/MissingPages"), "DirectoryPage");
const HostEventPage = lazyNamed(() => import("./pages/MissingPages"), "HostEventPage");
const InformationPage = lazyNamed(() => import("./pages/MissingPages"), "InformationPage");
const MemberProfilePage = lazyNamed(() => import("./pages/MissingPages"), "MemberProfilePage");
const MembershipHubPage = lazyNamed(() => import("./pages/MissingPages"), "MembershipHubPage");
const OrganizationHubPage = lazyNamed(() => import("./pages/MissingPages"), "OrganizationHubPage");
const PartnerDirectoryPage = lazyNamed(() => import("./pages/MissingPages"), "PartnerDirectoryPage");
const PerksPublicPage = lazyNamed(() => import("./pages/MissingPages"), "PerksPublicPage");
const PublicDetailPage = lazyNamed(() => import("./pages/MissingPages"), "PublicDetailPage");
const RegistrationsPage = lazyNamed(() => import("./pages/MissingPages"), "RegistrationsPage");
const RequestBrowsePage = lazyNamed(() => import("./pages/MissingPages"), "RequestBrowsePage");
const RequestDetailPage = lazyNamed(() => import("./pages/MissingPages"), "RequestDetailPage");
const SystemStatePage = lazyNamed(() => import("./pages/MissingPages"), "SystemStatePage");
const WebinarsPage = lazyNamed(() => import("./pages/MissingPages"), "WebinarsPage");
const WorkshopsPage = lazyNamed(() => import("./pages/MissingPages"), "WorkshopsPage");
const WorkspaceCommunityPage = lazyNamed(() => import("./pages/MissingPages"), "WorkspaceCommunityPage");
const WorkspaceDirectoryPage = lazyNamed(() => import("./pages/MissingPages"), "WorkspaceDirectoryPage");
const WorkspaceEventsPage = lazyNamed(() => import("./pages/MissingPages"), "WorkspaceEventsPage");
const WorkspaceRequestsPage = lazyNamed(() => import("./pages/MissingPages"), "WorkspaceRequestsPage");
// These three each only import ProductShell from ProductFlows.tsx, but a static import from an
// eagerly-loaded file would have pulled the whole ProductFlows chunk back into the initial
// bundle anyway - lazy-loading them too keeps that split effective.
const AccountableActivityWorkspace = lazyNamed(() => import("./pages/AccountableActivity"), "AccountableActivityWorkspace");
const DecisionAccountabilityWorkspace = lazyNamed(() => import("./pages/DecisionAccountability"), "DecisionAccountabilityWorkspace");
const WeeklyDecisionReviewWorkspace = lazyNamed(() => import("./pages/WeeklyDecisionReview"), "WeeklyDecisionReviewWorkspace");
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
import "./nonlanding-controls-refinement.css";
import "./partner-motion-refinement.css";
import "./residual-route-refinement.css";
import "./anti-ai-motif-refinement.css";
import "./target-route-refinement.css";
import "./ux-audit-refinement.css";
import "./bilingual-alignment-refinement.css";
import "./decorative-process-removal.css";
import "./events-redesign.css";
import "./soft-surface-refinement.css";
import "./founder-operating-desk.css";
import "./design-system-v2.css";
import { SiteShell } from "./components/site";

function Router() {
  return <Suspense fallback={<div className="route-loading" aria-hidden="true" />}><Switch>
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
    <Route path="/dashboard/registrations" component={AccountableActivityWorkspace} />
    <Route path="/dashboard/decision-review" component={DecisionReviewWorkspace} />
    <Route path="/dashboard/decision-accountability" component={DecisionAccountabilityWorkspace} />
    <Route path="/dashboard/weekly-review" component={WeeklyDecisionReviewWorkspace} />
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
    <Route path="/courses" component={Learn} />
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
    <Route path="/partners" component={PartnerDirectoryPage} />
    <Route path="/partners/apply" component={() => <ApplicationsPage kind="partner" />} />
    <Route path="/sponsorship" component={() => <CommercialPage kind="sponsors" />} />
    <Route path="/applications" component={() => <ApplicationsPage />} />
    <Route path="/providers/join" component={() => <ApplicationsPage kind="provider" />} />
    <Route path="/demo-day" component={() => <DemoDayPage />} />

    <Route path="/contact" component={ContactFlow} />
    <Route path="/support" component={Support} />
    <Route path="/about" component={() => <InformationPage kind="about" />} />
    <Route path="/privacy" component={() => <InformationPage kind="privacy" />} />
    <Route path="/terms" component={() => <InformationPage kind="terms" />} />
    <Route path="/403" component={() => <SystemStatePage code="403" />} />
    <Route path="/429" component={() => <SystemStatePage code="429" />} />
    <Route path="/500" component={() => <SystemStatePage code="500" />} />
    <Route path="/offline" component={() => <SystemStatePage code="offline" />} />
    <Route path="/maintenance" component={() => <SystemStatePage code="maintenance" />} />
    <Route path="/invitation/expired" component={() => <SystemStatePage code="invitation-expired" />} />
    <Route path="/404" component={NotFound} />
    <Route component={NotFound} />
  </Switch></Suspense>;
}

export default function App() {
  return <ErrorBoundary><SiteShell><Router /></SiteShell></ErrorBoundary>;
}
