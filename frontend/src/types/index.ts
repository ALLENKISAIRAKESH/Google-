export interface UserProfile {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  coverUrl?: string;
  headline: string;
  bio: string;
  location?: string;
  interests: string[];
  skills: string[];
  websiteUrl?: string;
  isPublic: boolean;
  role?: 'user' | 'moderator' | 'admin';
  developerProfile?: DeveloperProfile;
  circles?: Circle[];
}

export interface DeveloperProfile {
  userId: string;
  githubUrl?: string;
  leetcodeUrl?: string;
  codeforcesUrl?: string;
  hackerrankUrl?: string;
  portfolioUrl?: string;
  linkedinUrl?: string;
  primarySkills: string[];
  learningGoals: string[];
  availability: 'open_to_collab' | 'mentoring' | 'seeking_mentor' | 'busy';
}

export interface Circle {
  id: string;
  ownerId: string;
  name: string;
  description?: string;
  color: string;
  memberCount: number;
  memberUserIds: string[];
}

export type PostType = 'text' | 'link' | 'image' | 'question' | 'project_showcase' | 'event_announcement';
export type AudienceType = 'public' | 'circles' | 'community' | 'private';

export interface Post {
  id: string;
  authorId: string;
  author: {
    username: string;
    displayName: string;
    avatarUrl: string;
    headline?: string;
  };
  type: PostType;
  body: string;
  linkUrl?: string;
  linkPreview?: {
    title: string;
    description: string;
    domain: string;
    imageUrl?: string;
  };
  mediaUrls?: string[];
  audienceType: AudienceType;
  circleId?: string;
  circleName?: string;
  communityId?: string;
  communityName?: string;
  reactions: {
    plusOne: number;
    heart: number;
    rocket: number;
    celebrate: number;
    userReacted?: 'plusOne' | 'heart' | 'rocket' | 'celebrate';
  };
  commentCount: number;
  comments?: Comment[];
  createdAt: string;
  isBookmarked?: boolean;
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: {
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  body: string;
  createdAt: string;
}

export interface Community {
  id: string;
  ownerId: string;
  slug: string;
  name: string;
  description: string;
  category: string;
  avatarUrl: string;
  bannerUrl?: string;
  visibility: 'public' | 'restricted' | 'private';
  rules: string[];
  memberCount: number;
  isMember?: boolean;
  memberRole?: 'owner' | 'moderator' | 'member';
  createdAt: string;
}

export interface Collection {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  visibility: 'public' | 'private';
  color: string;
  itemCount: number;
  items?: CollectionItem[];
  createdAt: string;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  postId?: string;
  post?: Post;
  externalUrl?: string;
  title: string;
  note?: string;
  createdAt: string;
}

export interface Project {
  id: string;
  ownerId: string;
  owner: {
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  title: string;
  tagline: string;
  description: string;
  techStack: string[];
  rolesNeeded: string[];
  commitment: 'hackathon' | 'part_time' | 'full_time' | 'casual';
  status: 'recruiting' | 'in_progress' | 'completed' | 'archived';
  visibility: 'public' | 'private';
  repoUrl?: string;
  demoUrl?: string;
  members: ProjectMember[];
  tasks: ProjectTask[];
  applications?: ProjectApplication[];
  createdAt: string;
}

export interface ProjectMember {
  userId: string;
  displayName: string;
  username: string;
  avatarUrl: string;
  role: 'owner' | 'lead' | 'contributor';
}

export interface ProjectTask {
  id: string;
  projectId: string;
  title: string;
  description?: string;
  status: 'todo' | 'in_progress' | 'done';
  assigneeName?: string;
}

export interface ProjectApplication {
  id: string;
  projectId: string;
  applicantId: string;
  applicant: {
    username: string;
    displayName: string;
    avatarUrl: string;
    headline?: string;
  };
  roleApplied: string;
  message: string;
  portfolioNote?: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface EventItem {
  id: string;
  organizerId: string;
  organizer: {
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  title: string;
  description: string;
  category: 'hackathon' | 'webinar' | 'workshop' | 'contest' | 'meetup';
  startAt: string;
  endAt: string;
  timezone: string;
  location?: string;
  onlineUrl?: string;
  bannerUrl?: string;
  capacity?: number;
  visibility: 'public' | 'private';
  status: 'upcoming' | 'live' | 'ended';
  attendeeCount: number;
  isRegistered?: boolean;
  // Opt-in Instant Connect state for current user
  networkingOptIn?: boolean;
  networkingGoal?: 'teammate' | 'mentor' | 'study_partner' | 'speaker_organizer' | 'general_networking';
  introNote?: string;
  visibleFields?: {
    skills: boolean;
    interests: boolean;
    github: boolean;
    bio: boolean;
  };
}

export interface InstantConnectAttendee {
  id: string;
  userId: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  headline?: string;
  networkingGoal: 'teammate' | 'mentor' | 'study_partner' | 'speaker_organizer' | 'general_networking';
  intro: string;
  skills: string[];
  interests: string[];
  githubUrl?: string;
  registeredAt: string;
  connectionStatus?: 'none' | 'pending_sent' | 'pending_received' | 'connected';
}

export interface ConnectionRequest {
  id: string;
  eventId?: string;
  eventTitle?: string;
  sender: {
    userId: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    headline?: string;
  };
  receiverId: string;
  message: string;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: string;
}

export interface NotificationItem {
  id: string;
  recipientId: string;
  actor: {
    username: string;
    displayName: string;
    avatarUrl: string;
  };
  type: 'reply' | 'reaction' | 'mention' | 'follow' | 'project_application' | 'instant_connect_request' | 'instant_connect_accepted' | 'event_reminder';
  title: string;
  body: string;
  entityType?: string;
  entityId?: string;
  readAt?: string;
  createdAt: string;
}

export interface MessageConversation {
  id: string;
  participant: {
    userId: string;
    username: string;
    displayName: string;
    avatarUrl: string;
    isOnline?: boolean;
  };
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
  messages: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  senderId: string;
  body: string;
  createdAt: string;
}

export interface ModerationReport {
  id: string;
  reporterId: string;
  reporterName: string;
  targetType: 'user' | 'post' | 'comment' | 'community' | 'project' | 'event' | 'instant_connect';
  targetId: string;
  targetSummary: string;
  reason: string;
  details?: string;
  status: 'submitted' | 'under_review' | 'actioned' | 'dismissed';
  createdAt: string;
}

export interface Reel {
  id: string;
  creatorId: string;
  creator: {
    username: string;
    displayName: string;
    avatarUrl: string;
    headline?: string;
  };
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  category: 'tech' | 'ai' | 'dev_life' | 'tips' | 'design';
  tags: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  isLiked?: boolean;
  isBookmarked?: boolean;
  createdAt: string;
}

