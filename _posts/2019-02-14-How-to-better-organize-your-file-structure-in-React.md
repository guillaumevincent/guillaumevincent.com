---
layout: post
title: How to better organize your file structure in React
author: gvincent
lang: en
tags: javascript react structure
---

You can find a lot of article describing the "best" folder structure you can find for React application. Instead of trying to find the one to rule them all, I will try in this blog post to describe what is important in my opinion when you are trying to structure your application.

## Help your user navigate

![school plan](/images/posts/school.jpg){:.img-responsive}

Like a plan, the structure of your fodlers should help your user navigate. When you open your project in your IDE, the file explorer should be like a plan. You must understand in one look where you are going.

When I'm creating a web app, I probably split my web app in pages, and inside those pages, I will display some information I get from the outside of my application. I will probably call some service reaching some API.

When I'm coding, and I need to understand a problem and do some tests, or add a new feature. In both cases you want to reach the right file as quickly as possible. So I like to split my folders in pages:

```
.
├── App.js
├── index.js
├── jobs
├── loading
├── login
├── products
├── teams
├── topics
└── users
```

## Avoid technical separations

Sometimes you see some tutorial about redux or redux saga, telling you to move all your actions in an `actions` folder, your action types in a `actionTypes` folder and all your reducer in a `reducer` folder.

In user experience there is a law called the `Law of Proximity`

> Objects that are near, or proximate to each other, tend to be grouped together. 

So if you are manipulating files attached to the user page, you will probably group those files together to help your brain to feel great.

```
└── users
    ├── EditUserButton.js
    ├── NewUserButton.js
    ├── UserForm.js
    ├── usersActions.js
    ├── UsersPage.js
    ├── usersReducer.js
    └── usersSelectors.js
```

## Easy to remove

> Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away - Antoine de Saint-Exupery

A good code is no code. So when you design the structure of your application, you need to ask yourself: `"Is it going to be difficult to remove this page from my application?"`

If the answer is `"I'm going to remove this folder, and edit one line here"`, then you are probably helping you and your teammates working on your code.

If you need to edit or remove three folders in three different places, fix some imports, and update and remove some lines of code, you are going to be in trouble.

## Keep it simple sir (KISS)

Do not start with too complex structure. Keep it simple.
Follow the [Dan Abramov rule](https://twitter.com/dan_abramov/status/1027245759232651270):

> move files around until it feels right

Do not forget the Miller's law:

> The average person can only keep 7 (plus or minus 2) items in their working memory.


## Read some code to take some idea somewhere

Here the structure of the [web application](https://github.com/redhat-cip/dci-ui/) I'm working on right now. Ok It looks like a bit complicated, but it's a good sign, I need to remove some pages ;)

```
├── alerts
│   ├── alertsActions.js
│   ├── alertsActions.test.js
│   ├── alertsActionsTypes.js
│   ├── Alerts.js
│   ├── alertsReducer.js
│   └── alertsReducer.test.js
├── api
│   ├── apiActions.js
│   ├── apiActions.test.js
│   ├── apiActionsTypes.js
│   ├── apiActionsTypes.test.js
│   ├── apiReducers.js
│   ├── apiReducers.test.js
│   ├── schema.js
│   └── schema.test.js
├── App.css
├── App.js
├── App.test.js
├── components
│   ├── componentsActions.js
│   ├── ComponentsContainer.js
│   ├── componentSelectors.js
│   ├── componentsReducer.js
│   └── componentsSelectors.js
├── config
│   ├── configActions.js
│   ├── configActions.test.js
│   ├── configActionsTypes.js
│   ├── configReducer.js
│   └── configReducer.test.js
├── currentUser
│   ├── currentUserActions.js
│   ├── currentUserActions.test.js
│   ├── currentUserActionsTypes.js
│   ├── currentUserReducer.js
│   ├── currentUserReducer.test.js
│   └── currentUserSelectors.js
├── form
│   ├── Checkbox.js
│   ├── FormModal.js
│   ├── HiddenInput.js
│   ├── index.js
│   ├── Input.js
│   ├── Select.js
│   └── TextareaJSON.js
├── globalStatus
│   ├── globalStatusActions.js
│   ├── globalStatusActionsTypes.js
│   ├── GlobalStatusContainer.js
│   ├── globalStatusGetters.js
│   ├── globalStatusGetters.test.js
│   ├── globalStatusReducer.js
│   ├── globalStatusReducer.test.js
│   └── StatDetails.js
├── index.js
├── jobs
│   ├── files
│   │   ├── File.js
│   │   ├── filesActions.js
│   │   ├── filesGetters.js
│   │   ├── filesGetters.test.js
│   │   └── FilesList.js
│   ├── issues
│   │   ├── IssueForm.js
│   │   ├── Issue.js
│   │   ├── issuesActions.js
│   │   ├── IssuesList.js
│   │   └── NewIssueButton.js
│   ├── JobContainer.js
│   ├── jobsActions.js
│   ├── JobsContainer.js
│   ├── jobsReducer.js
│   ├── jobsSelectors.js
│   ├── jobStates
│   │   ├── JobStateComponents.js
│   │   ├── JobStateFile.js
│   │   ├── jobStatesActions.js
│   │   ├── jobStatesActions.test.js
│   │   └── JobStatesList.js
│   ├── JobSummary.js
│   ├── tests
│   │   ├── TestHeader.js
│   │   ├── Test.js
│   │   ├── testsActions.js
│   │   ├── TestsCase.js
│   │   ├── TestsCases.js
│   │   └── TestsList.js
│   └── toolbar
│       ├── filters.js
│       ├── filters.test.js
│       ├── Pagination.js
│       ├── RemoteciInTeamFilter.js
│       ├── StatusFilter.js
│       ├── Toolbar.js
│       └── TopicsFilter.js
├── layout
│   ├── img_avatar.svg
│   ├── index.js
│   ├── MainContent.js
│   └── Page.js
├── loading
│   └── LoadingContainer.js
├── login
│   ├── LoginContainer.js
│   ├── LoginForm.js
│   └── SSOForm.js
├── logo.svg
├── pages.js
├── permissions
│   ├── PermissionsContainer.js
│   ├── teamsTopicsActions.js
│   └── TeamsTopicsListPermissions.js
├── products
│   ├── EditProductButton.js
│   ├── NewProductButton.js
│   ├── producstActions.js
│   ├── ProductForm.js
│   ├── ProductsContainer.js
│   ├── productSelectors.js
│   └── productsReducer.js
├── profile
│   ├── ChangePasswordForm.js
│   ├── ProfileContainer.js
│   └── ProfileForm.js
├── remotecis
│   ├── EditRemoteciButton.js
│   ├── NewRemoteciButton.js
│   ├── NotificationsContainer.js
│   ├── RemoteciForm.js
│   ├── remotecisActions.js
│   ├── RemotecisContainer.js
│   ├── remotecisReducer.js
│   ├── remotecisSelectors.js
│   ├── SubscribeForm.js
│   └── UnsubscribeForm.js
├── roles
│   ├── rolesActions.js
│   ├── rolesReducer.js
│   └── rolesSelectors.js
├── router
│   ├── Container404.js
│   ├── index.js
│   └── PrivateRoute.js
├── services
│   ├── date.js
│   ├── date.test.js
│   ├── http.js
│   ├── localStorage.js
│   ├── localStorage.test.js
│   ├── runcom.js
│   └── sso.js
├── setupTests.js
├── store.js
├── teams
│   ├── EditTeamButton.js
│   ├── NewTeamButton.js
│   ├── TeamForm.js
│   ├── teamsActions.js
│   ├── TeamsContainer.js
│   ├── teamsReducer.js
│   └── teamsSelectors.js
├── topics
│   ├── EditTopicButton.js
│   ├── NewTopicButton.js
│   ├── TopicForm.js
│   ├── topicsActions.js
│   ├── TopicsContainer.js
│   ├── topicsReducer.js
│   └── topicsSelectors.js
├── trends
│   ├── TrendGraph.js
│   ├── trendsActions.js
│   ├── trendsActionsTypes.js
│   ├── TrendsContainer.js
│   ├── trendsGetters.js
│   ├── trendsGetters.test.js
│   ├── trendsReducer.js
│   └── trendsReducer.test.js
├── ui
│   ├── BackgroundImage.js
│   ├── blinkLogo
│   │   ├── BlinkLogo.js
│   │   └── dci-gecko-paw.svg
│   ├── Colors.js
│   ├── ConfirmDeleteButton.js
│   ├── CopyButton.js
│   ├── EmptyState.js
│   ├── filters
│   │   ├── Filter.js
│   │   └── LoadingFilter.js
│   ├── index.js
│   ├── KebabDropdown.js
│   ├── Labels.js
│   ├── RotatingSpinnerIcon.js
│   └── styles.js
└── users
    ├── EditUserButton.js
    ├── NewUserButton.js
    ├── UserForm.js
    ├── usersActions.js
    ├── UsersContainer.js
    ├── userSelectors.js
    ├── usersReducer.js
    └── usersSelectors.js
```