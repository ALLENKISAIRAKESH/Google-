# Routes, screens and reusable components

## Required routes
- `/` — Home feed
- `/auth/sign-in`, `/auth/sign-up`, `/auth/reset-password`
- `/profile/:username`, `/settings/profile`, `/settings/privacy`, `/settings/notifications`, `/settings/security`
- `/communities`, `/communities/new`, `/communities/:slug`, `/communities/:slug/settings`
- `/explore`, `/search`
- `/collections`, `/collections/:id`
- `/developers`, `/developers/:username`
- `/projects`, `/projects/new`, `/projects/:id`, `/projects/:id/edit`
- `/events`, `/events/new`, `/events/:id`, `/events/:id/edit`, `/events/:id/instant-connect`
- `/notifications`
- `/messages` (simplified or phase-gated)
- `/moderation` (authorized moderators/admins only)
- `/about`, `/privacy`, `/terms`, `/not-found`

## Shared layout
- Responsive sidebar/top bar, mobile navigation drawer/bottom nav.
- Search entry, create action, notification indicator and profile menu.
- Main content container with optional right rail.
- Toasts, confirmation dialogs, loading skeletons and error boundaries.

## Reusable components
- Avatar, UserCard, ProfileHeader, PrivacyBadge
- PostCard, PostComposer, AudienceSelector, CommentThread, ReactionBar
- FeedFilterBar, EmptyState, LoadingState, ErrorState
- CommunityCard, CommunityHeader, MembershipButton, MemberList, ModeratorTools
- CollectionCard, CollectionItem
- DeveloperCard, SkillTag, ExternalProfileLink
- ProjectCard, ProjectForm, ApplicationCard, TeamMemberList, TaskChecklist
- EventCard, EventForm, RSVPButton, AttendeeVisibilityControl
- InstantConnectToggle, NetworkingGoalSelector, IntroRequestCard, ConnectionRequestActions
- NotificationItem, ReportDialog, BlockMuteControls
- SearchBar, FilterChips, Pagination/LoadMore
- FormField, Button, Dialog, Dropdown, Tooltip, Toast
- SettingsSection and privacy controls

## Page-state requirements
Every data-driven screen must implement:
- loading state
- empty state
- error state with retry where reasonable
- success feedback
- permission-denied state
- mobile layout
