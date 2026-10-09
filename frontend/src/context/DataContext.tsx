import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Post, 
  Community, 
  Project, 
  EventItem, 
  InstantConnectAttendee, 
  Collection, 
  NotificationItem, 
  MessageConversation, 
  ModerationReport,
  AudienceType,
  PostType,
  Reel
} from '../types';
import { 
  INITIAL_POSTS, 
  INITIAL_COMMUNITIES, 
  INITIAL_PROJECTS, 
  INITIAL_EVENTS, 
  INITIAL_INSTANT_CONNECT_ATTENDEES, 
  INITIAL_COLLECTIONS, 
  INITIAL_NOTIFICATIONS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_REPORTS,
  INITIAL_REELS
} from '../lib/mockData';
import { useAuth } from './AuthContext';

interface DataContextType {
  posts: Post[];
  communities: Community[];
  projects: Project[];
  events: EventItem[];
  instantConnectAttendees: InstantConnectAttendee[];
  collections: Collection[];
  notifications: NotificationItem[];
  conversations: MessageConversation[];
  reports: ModerationReport[];
  reels: Reel[];
  likeReel: (reelId: string) => void;
  createReel: (data: {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    category: 'tech' | 'ai' | 'dev_life' | 'tips' | 'design';
    tags: string[];
  }) => void;
  
  // Post actions
  createPost: (data: {
    body: string;
    type: PostType;
    audienceType: AudienceType;
    circleId?: string;
    circleName?: string;
    communityId?: string;
    communityName?: string;
    linkUrl?: string;
    mediaUrls?: string[];
  }) => void;
  reactToPost: (postId: string, reactionType: 'plusOne' | 'heart' | 'rocket' | 'celebrate') => void;
  addComment: (postId: string, body: string) => void;
  deletePost: (postId: string) => void;
  toggleBookmark: (postId: string) => void;

  // Community actions
  toggleJoinCommunity: (communityId: string) => void;
  createCommunity: (data: {
    name: string;
    slug: string;
    description: string;
    category: string;
    visibility: 'public' | 'restricted' | 'private';
    rules: string[];
    avatarUrl?: string;
  }) => void;

  // Project actions
  createProject: (data: {
    title: string;
    tagline: string;
    description: string;
    techStack: string[];
    rolesNeeded: string[];
    commitment: 'hackathon' | 'part_time' | 'full_time' | 'casual';
    repoUrl?: string;
  }) => void;
  applyToProject: (projectId: string, roleApplied: string, message: string, portfolioNote?: string) => void;
  reviewProjectApplication: (projectId: string, applicationId: string, action: 'accepted' | 'declined') => void;
  toggleTaskStatus: (projectId: string, taskId: string) => void;

  // Event & Instant Connect actions
  toggleEventRSVP: (eventId: string) => void;
  toggleInstantConnectOptIn: (eventId: string, optIn: boolean, goal?: any, intro?: string, visibleFields?: any) => void;
  sendInstantConnectIntro: (receiverUserId: string, message: string, eventId?: string) => void;
  respondToConnectionRequest: (attendeeId: string, action: 'accept' | 'decline') => void;

  // Collection actions
  createCollection: (title: string, description: string, visibility: 'public' | 'private', color?: string) => void;
  addToCollection: (collectionId: string, postId: string) => void;

  // Notifications & Messages
  markNotificationAsRead: (notificationId: string) => void;
  markAllNotificationsAsRead: () => void;
  sendMessage: (conversationId: string, body: string) => void;

  // Moderation
  submitReport: (targetType: any, targetId: string, targetSummary: string, reason: string, details?: string) => void;
  updateReportStatus: (reportId: string, status: 'submitted' | 'under_review' | 'actioned' | 'dismissed') => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('gplus_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  const [communities, setCommunities] = useState<Community[]>(() => {
    const saved = localStorage.getItem('gplus_communities');
    return saved ? JSON.parse(saved) : INITIAL_COMMUNITIES;
  });

  const [projects, setProjects] = useState<Project[]>(() => {
    const saved = localStorage.getItem('gplus_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('gplus_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [instantConnectAttendees, setInstantConnectAttendees] = useState<InstantConnectAttendee[]>(() => {
    const saved = localStorage.getItem('gplus_ic_attendees');
    return saved ? JSON.parse(saved) : INITIAL_INSTANT_CONNECT_ATTENDEES;
  });

  const [collections, setCollections] = useState<Collection[]>(() => {
    const saved = localStorage.getItem('gplus_collections');
    return saved ? JSON.parse(saved) : INITIAL_COLLECTIONS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('gplus_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [conversations, setConversations] = useState<MessageConversation[]>(() => {
    const saved = localStorage.getItem('gplus_conversations');
    return saved ? JSON.parse(saved) : INITIAL_CONVERSATIONS;
  });

  const [reports, setReports] = useState<ModerationReport[]>(() => {
    const saved = localStorage.getItem('gplus_reports');
    return saved ? JSON.parse(saved) : INITIAL_REPORTS;
  });

  const [reels, setReels] = useState<Reel[]>(() => {
    const saved = localStorage.getItem('gplus_reels');
    return saved ? JSON.parse(saved) : INITIAL_REELS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('gplus_reels', JSON.stringify(reels));
  }, [reels]);
  useEffect(() => {
    localStorage.setItem('gplus_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('gplus_communities', JSON.stringify(communities));
  }, [communities]);

  useEffect(() => {
    localStorage.setItem('gplus_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('gplus_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('gplus_ic_attendees', JSON.stringify(instantConnectAttendees));
  }, [instantConnectAttendees]);

  useEffect(() => {
    localStorage.setItem('gplus_collections', JSON.stringify(collections));
  }, [collections]);

  useEffect(() => {
    localStorage.setItem('gplus_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('gplus_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('gplus_reports', JSON.stringify(reports));
  }, [reports]);

  // Post Actions
  const createPost = (data: {
    body: string;
    type: PostType;
    audienceType: AudienceType;
    circleId?: string;
    circleName?: string;
    communityId?: string;
    communityName?: string;
    linkUrl?: string;
    mediaUrls?: string[];
  }) => {
    const newPost: Post = {
      id: `post_${Date.now()}`,
      authorId: currentUser.id,
      author: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
        headline: currentUser.headline
      },
      type: data.type,
      body: data.body,
      audienceType: data.audienceType,
      circleId: data.circleId,
      circleName: data.circleName,
      communityId: data.communityId,
      communityName: data.communityName,
      linkUrl: data.linkUrl,
      mediaUrls: data.mediaUrls,
      reactions: {
        plusOne: 0,
        heart: 0,
        rocket: 0,
        celebrate: 0
      },
      commentCount: 0,
      comments: [],
      createdAt: new Date().toISOString()
    };

    setPosts(prev => [newPost, ...prev]);
  };

  const reactToPost = (postId: string, reactionType: 'plusOne' | 'heart' | 'rocket' | 'celebrate') => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;

      const currentReactions = { ...p.reactions };
      const currentReacted = currentReactions.userReacted;

      if (currentReacted === reactionType) {
        // Toggle off
        currentReactions[reactionType] = Math.max(0, currentReactions[reactionType] - 1);
        currentReactions.userReacted = undefined;
      } else {
        // Remove previous if exists
        if (currentReacted) {
          currentReactions[currentReacted] = Math.max(0, currentReactions[currentReacted] - 1);
        }
        currentReactions[reactionType] += 1;
        currentReactions.userReacted = reactionType;
      }

      return { ...p, reactions: currentReactions };
    }));
  };

  const addComment = (postId: string, body: string) => {
    if (!body.trim()) return;
    const newComment = {
      id: `c_${Date.now()}`,
      postId,
      authorId: currentUser.id,
      author: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl
      },
      body: body.trim(),
      createdAt: new Date().toISOString()
    };

    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentCount: p.commentCount + 1,
        comments: [...(p.comments || []), newComment]
      };
    }));
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
  };

  const toggleBookmark = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return { ...p, isBookmarked: !p.isBookmarked };
      }
      return p;
    }));
  };

  // Community Actions
  const toggleJoinCommunity = (communityId: string) => {
    setCommunities(prev => prev.map(c => {
      if (c.id !== communityId) return c;
      const isJoining = !c.isMember;
      return {
        ...c,
        isMember: isJoining,
        memberCount: isJoining ? c.memberCount + 1 : Math.max(1, c.memberCount - 1)
      };
    }));
  };

  const createCommunity = (data: {
    name: string;
    slug: string;
    description: string;
    category: string;
    visibility: 'public' | 'restricted' | 'private';
    rules: string[];
    avatarUrl?: string;
  }) => {
    const newComm: Community = {
      id: `comm_${Date.now()}`,
      ownerId: currentUser.id,
      slug: data.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-'),
      name: data.name,
      description: data.description,
      category: data.category,
      avatarUrl: data.avatarUrl || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=150&auto=format&fit=crop&q=80',
      visibility: data.visibility,
      rules: data.rules,
      memberCount: 1,
      isMember: true,
      memberRole: 'owner',
      createdAt: new Date().toISOString()
    };

    setCommunities(prev => [newComm, ...prev]);
  };

  // Project Actions
  const createProject = (data: {
    title: string;
    tagline: string;
    description: string;
    techStack: string[];
    rolesNeeded: string[];
    commitment: 'hackathon' | 'part_time' | 'full_time' | 'casual';
    repoUrl?: string;
  }) => {
    const newProj: Project = {
      id: `proj_${Date.now()}`,
      ownerId: currentUser.id,
      owner: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl
      },
      title: data.title,
      tagline: data.tagline,
      description: data.description,
      techStack: data.techStack,
      rolesNeeded: data.rolesNeeded,
      commitment: data.commitment,
      status: 'recruiting',
      visibility: 'public',
      repoUrl: data.repoUrl,
      members: [
        {
          userId: currentUser.id,
          displayName: currentUser.displayName,
          username: currentUser.username,
          avatarUrl: currentUser.avatarUrl,
          role: 'owner'
        }
      ],
      tasks: [
        { id: `t_${Date.now()}_1`, projectId: `proj_${Date.now()}`, title: 'Setup Repository and Initial Architecture', status: 'in_progress' }
      ],
      applications: [],
      createdAt: new Date().toISOString()
    };

    setProjects(prev => [newProj, ...prev]);
  };

  const applyToProject = (projectId: string, roleApplied: string, message: string, portfolioNote?: string) => {
    const newApp = {
      id: `app_${Date.now()}`,
      projectId,
      applicantId: currentUser.id,
      applicant: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
        headline: currentUser.headline
      },
      roleApplied,
      message,
      portfolioNote,
      status: 'pending' as const,
      createdAt: new Date().toISOString()
    };

    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        applications: [...(p.applications || []), newApp]
      };
    }));
  };

  const reviewProjectApplication = (projectId: string, applicationId: string, action: 'accepted' | 'declined') => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;

      const app = p.applications?.find(a => a.id === applicationId);
      const updatedApps = p.applications?.map(a => a.id === applicationId ? { ...a, status: action } : a);

      let updatedMembers = [...p.members];
      if (action === 'accepted' && app) {
        updatedMembers.push({
          userId: app.applicantId,
          displayName: app.applicant.displayName,
          username: app.applicant.username,
          avatarUrl: app.applicant.avatarUrl,
          role: 'contributor'
        });
      }

      return {
        ...p,
        applications: updatedApps,
        members: updatedMembers
      };
    }));
  };

  const toggleTaskStatus = (projectId: string, taskId: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id !== projectId) return p;
      return {
        ...p,
        tasks: p.tasks.map(t => {
          if (t.id !== taskId) return t;
          const nextStatus = t.status === 'todo' ? 'in_progress' : t.status === 'in_progress' ? 'done' : 'todo';
          return { ...t, status: nextStatus };
        })
      };
    }));
  };

  // Event & Opt-in Instant Connect Actions
  const toggleEventRSVP = (eventId: string) => {
    setEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      const isReg = !e.isRegistered;
      return {
        ...e,
        isRegistered: isReg,
        attendeeCount: isReg ? e.attendeeCount + 1 : Math.max(0, e.attendeeCount - 1),
        // If canceling RSVP, revoke Instant Connect networking immediately
        networkingOptIn: isReg ? e.networkingOptIn : false
      };
    }));
  };

  const toggleInstantConnectOptIn = (eventId: string, optIn: boolean, goal?: any, intro?: string, visibleFields?: any) => {
    setEvents(prev => prev.map(e => {
      if (e.id !== eventId) return e;
      return {
        ...e,
        networkingOptIn: optIn,
        networkingGoal: goal || e.networkingGoal || 'teammate',
        introNote: intro || e.introNote || '',
        visibleFields: visibleFields || e.visibleFields
      };
    }));

    if (optIn) {
      // Add or update current user in the attendee directory
      setInstantConnectAttendees(prev => {
        const filtered = prev.filter(a => a.userId !== currentUser.id);
        const selfAttendee: InstantConnectAttendee = {
          id: `ic_self_${Date.now()}`,
          userId: currentUser.id,
          username: currentUser.username,
          displayName: currentUser.displayName,
          avatarUrl: currentUser.avatarUrl,
          headline: currentUser.headline,
          networkingGoal: goal || 'teammate',
          intro: intro || 'Looking for project collaborators!',
          skills: currentUser.skills,
          interests: currentUser.interests,
          githubUrl: currentUser.developerProfile?.githubUrl,
          registeredAt: new Date().toISOString(),
          connectionStatus: 'none'
        };
        return [selfAttendee, ...filtered];
      });
    } else {
      // PRD Guardrail: Opt-out IMMEDIATELY removes attendee from discovery directory!
      setInstantConnectAttendees(prev => prev.filter(a => a.userId !== currentUser.id));
    }
  };

  const sendInstantConnectIntro = (receiverUserId: string, message: string) => {
    setInstantConnectAttendees(prev => prev.map(a => {
      if (a.userId === receiverUserId) {
        return { ...a, connectionStatus: 'pending_sent' };
      }
      return a;
    }));

    const receiver = instantConnectAttendees.find(a => a.userId === receiverUserId);
    if (receiver) {
      setNotifications(prev => [
        {
          id: `notif_${Date.now()}`,
          recipientId: receiverUserId,
          actor: {
            username: currentUser.username,
            displayName: currentUser.displayName,
            avatarUrl: currentUser.avatarUrl
          },
          type: 'instant_connect_request',
          title: 'Instant Connect Intro Request',
          body: `${currentUser.displayName} sent you an introduction request: "${message}"`,
          createdAt: new Date().toISOString()
        },
        ...prev
      ]);
    }
  };

  const respondToConnectionRequest = (attendeeId: string, action: 'accept' | 'decline') => {
    setInstantConnectAttendees(prev => prev.map(a => {
      if (a.id === attendeeId) {
        return { ...a, connectionStatus: action === 'accept' ? 'connected' : 'none' };
      }
      return a;
    }));
  };

  // Collections
  const createCollection = (title: string, description: string, visibility: 'public' | 'private', color = '#ea4335') => {
    const newColl: Collection = {
      id: `coll_${Date.now()}`,
      ownerId: currentUser.id,
      title,
      description,
      visibility,
      color,
      itemCount: 0,
      items: [],
      createdAt: new Date().toISOString()
    };
    setCollections(prev => [newColl, ...prev]);
  };

  const addToCollection = (collectionId: string, postId: string) => {
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    setCollections(prev => prev.map(c => {
      if (c.id !== collectionId) return c;
      const newItem = {
        id: `ci_${Date.now()}`,
        collectionId,
        postId,
        post,
        title: post.body.slice(0, 40) + '...',
        createdAt: new Date().toISOString()
      };
      return {
        ...c,
        itemCount: c.itemCount + 1,
        items: [...(c.items || []), newItem]
      };
    }));
  };

  // Notifications & Messages
  const markNotificationAsRead = (notificationId: string) => {
    setNotifications(prev => prev.map(n => n.id === notificationId ? { ...n, readAt: new Date().toISOString() } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, readAt: new Date().toISOString() })));
  };

  const sendMessage = (conversationId: string, body: string) => {
    if (!body.trim()) return;
    const newMsg = {
      id: `m_${Date.now()}`,
      senderId: currentUser.id,
      body: body.trim(),
      createdAt: new Date().toISOString()
    };

    setConversations(prev => prev.map(c => {
      if (c.id !== conversationId) return c;
      return {
        ...c,
        lastMessage: body.trim(),
        updatedAt: new Date().toISOString(),
        messages: [...c.messages, newMsg]
      };
    }));
  };

  // Moderation
  const submitReport = (targetType: any, targetId: string, targetSummary: string, reason: string, details?: string) => {
    const newReport: ModerationReport = {
      id: `rep_${Date.now()}`,
      reporterId: currentUser.id,
      reporterName: currentUser.displayName,
      targetType,
      targetId,
      targetSummary,
      reason,
      details,
      status: 'submitted',
      createdAt: new Date().toISOString()
    };

    setReports(prev => [newReport, ...prev]);
  };

  const updateReportStatus = (reportId: string, status: 'submitted' | 'under_review' | 'actioned' | 'dismissed') => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status } : r));
  };

  const likeReel = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id !== reelId) return r;
      const isLiked = !r.isLiked;
      return {
        ...r,
        isLiked,
        likesCount: isLiked ? r.likesCount + 1 : Math.max(0, r.likesCount - 1)
      };
    }));
  };

  const createReel = (data: {
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    category: 'tech' | 'ai' | 'dev_life' | 'tips' | 'design';
    tags: string[];
  }) => {
    const newReel: Reel = {
      id: `reel_${Date.now()}`,
      creatorId: currentUser.id,
      creator: {
        username: currentUser.username,
        displayName: currentUser.displayName,
        avatarUrl: currentUser.avatarUrl,
        headline: currentUser.headline
      },
      title: data.title,
      description: data.description,
      videoUrl: data.videoUrl,
      thumbnailUrl: data.thumbnailUrl,
      category: data.category,
      tags: data.tags,
      likesCount: 1,
      commentsCount: 0,
      sharesCount: 0,
      isLiked: true,
      createdAt: new Date().toISOString()
    };

    setReels(prev => [newReel, ...prev]);
  };

  return (
    <DataContext.Provider
      value={{
        posts,
        communities,
        projects,
        events,
        instantConnectAttendees,
        collections,
        notifications,
        conversations,
        reports,
        reels,
        likeReel,
        createReel,
        createPost,
        reactToPost,
        addComment,
        deletePost,
        toggleBookmark,
        toggleJoinCommunity,
        createCommunity,
        createProject,
        applyToProject,
        reviewProjectApplication,
        toggleTaskStatus,
        toggleEventRSVP,
        toggleInstantConnectOptIn,
        sendInstantConnectIntro,
        respondToConnectionRequest,
        createCollection,
        addToCollection,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        sendMessage,
        submitReport,
        updateReportStatus
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
