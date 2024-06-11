# 📊 Survey101

<p align="center">
  <img width="300" alt="logo" src="https://github.com/seohag/survey101-client/assets/126459089/33ea8aa8-3e7b-43aa-a772-94f81d000e01">
</p>

<p align="center">
  설문 양식을 직접 커스터마이징 하여 링크를 통해 공유하며 관리하고, 응답 받은 설문 결과 시각화를 도와주는 웹서비스 입니다.
</p>

<br>
<br>

# 🔗 링크

[Backend Repo](https://github.com/seohag/survey101-server) | [Deployed web](https://web.survey101.site/) | [Notion Link](https://yummy-saw-ada.notion.site/Survey-101-1c8b8c8b46f94e7fb771455032a82a6f?pvs=4)

<br>
<br>

# 📖 목차

- [개발 동기](#-개발-동기)
- [기능 미리보기 및 간단한 설명](#-기능-미리보기-및-설명)
- [테크 스택](#-테크-스택)
  - [React](#리액트는-왜-쓸까)
  - [Vite](#vite는-왜-사용했을까)
  - [React Query / Zustand](#react-query-그리고-zustand는-왜-사용했을까)
  - [FormData](#왜-formdata를-사용해서-작업했을까)
- [기술적 챌린지](#-기술적-챌린지)
  - [컴포넌트 모듈화](#컴포넌트-모듈화)
    - [가독성이 좋지 않은 코드와 동일한 코드 반복 작성](#가독성이-좋지-않은-코드와-동일한-코드-반복-작성)
    - [합성 컴포넌트 패턴으로 컴포넌트 분리](#합성-컴포넌트-패턴으로-컴포넌트-분리)
    - [컴포넌트를 분리한 결과](#컴포넌트를-분리한-결과)
  - [설문 데이터의 구조 설계](#설문-데이터-구조-설계)
    - [프로젝트에 적합한 데이터 구조는 무엇일까?](#프로젝트에-적합한-데이터-구조는-무엇일까)
    - [MongoDB의 Embedding 방식과 Reference 방식 조사](#mongodb의-embedding-방식과-reference-방식-조사)
    - [데이터 구조 설계 조사 후 적용결과](#데이터-구조-설계-조사-후-적용결과)
  - [사용자가 설문 문항에 필요한 여러 장의 이미지를 업로드 하는 과정에서의 에러 핸들링](#사용자가-설문-문항에-필요한-여러-장의-이미지를-업로드-하는-과정에서의-에러-핸들링)
    - [어떠한 에러인지 클라이언트에서 알지 못했다](#어떠한-에러인지-클라이언트에서-알지-못했다)
    - [정확한 에러 전달과 해당 에러에 맞는 분기 처리](#정확한-에러-전달과-해당-에러에-맞는-분기-처리)
    - [에러핸들링 결과](#에러핸들링-결과)
  - [클라이언트와 서버간의 API 통신간 예상치 못한 에러핸들링](#클라이언트와-서버와의-api-통신간-예상치-못한-에러-핸들링)
    - [문제]()
    - [해결과정]()
    - [결과]()
  - [유저 경험과 인터페이스는 어떤 부분을 신경썼을까?](#유저-경험과-인터페이스는-어떤-부분을-신경썼을까)
- [이슈](#-이슈)
  - [설문 이미지 수정이 되지 않는다](#설문-이미지-수정이-되지-않는다)
  - [배포환경에서 이미지 파일을 수정할 때 파일 크기 초과 에러 발생](#배포환경에서-이미지-파일을-수정할-때-파일-크기-초과-에러-발생)
- [일정](#-일정)
- [회고록](#-회고록)

<br>
<br>

# 👀 개발 동기

학생 때 구글 폼을 이용해서 설문 조사를 만들어서 지인 혹은 학우들에게 편하게 공유했던 경험이 있었습니다. 그러나 그 당시의 개인적인 생각으로는 구글 폼을 이용한 설문조사 제작이 조금은 지루하고 딱딱하게 느껴졌습니다. 만약 이러한 설문조사 양식을 커스터마이징 하는 웹서비스를 직접 만들어본다면 좋은 경험이 되지 않을까 라는 생각으로 해당 주제로 개발을 시작하게 되었습니다.

설문조사에 대한 여러 서비스를 찾아보았고, 기존에는 B2C 서비스에 익숙했지만 B2B 서비스까지도 찾아보게 되면서 정말 많은 서비스들이 존재한다는 것을 다시금 깨닫게 되며, 이러한 많은 서비스들 중 어떤 서비스가 사용자들의 니즈를 파악해서 적절하게 제공하고 있는지에 대한 점에 집중하며 몇 가지 추려보았습니다. 너무 많은 전문성을 요구하는 서비스는 제외하고 **smore** 라는 설문조사 제작 툴을 찾게되었고, 다른 서비스들에 비해 비교적 B2C에 가깝다는 판단하에 smore를 벤치마킹하며 설문조사 제작 툴을 만들어보았습니다.

우선 설문조사 제작 툴을 만드는데 있어서 어떻게 하면 **사용자가 설문 양식을 보기좋게 입맛대로 커스터마이징 할 수 있을까?** 라는 고민으로 시작해, **응답 받는 데이터 시각화** 까지도 보기 쉽게 제공할 수 있다면 괜찮은 설문조사 웹 서비스가 되지 않을까 라는 주제에 초점을 맞춰 **"Survey101"** 라는 이름으로 정하고 프로젝트를 진행했습니다.

**Survey101**은 사용자들이 더욱 직관적이고 맞춤형 설문조사를 만들 수 있도록 도와주는 것에 주안점을 두었으며, 간단하고 쉽게 설문 양식을 디자인할 수 있는 기능을 제공하고, 다양한 목적에 맞춘 설문을 작성할 수 있도록 서비스를 제공합니다. 또한 수집한 데이터를 시각화하여 제공함으로써 응답 결과를 더욱 쉽게 이해하고 분석할 수 있도록 도와주고, 이를 통해 데이터 분석에 걸리는 시간과 노력을 절약하면서 보다 의미 있는 인사이트를 얻을 수 있으면 했습니다. 이와 같은 기능들을 통해 사용자들이 더욱 효율적으로 정보를 수집하고 활용할 수 있도록 지원하는 것을 목표로 하는 웹서비스입니다.

<br>
<br>

# 🖥 기능 미리보기 및 설명

**구글 소셜 로그인**: 사용자는 구글을 통한 소셜로그인이 가능합니다.

<img width="600" alt="스크린샷 2024-06-03 04 55 42" src="https://github.com/seohag/survey101-client/assets/126459089/867c6ff6-363b-415f-869a-dd7447372396">

<br>
<br>

**대쉬보드 페이지**: 로그인한 사용자는 설문을 관리할 수 있는 대쉬보드 페이지에 들어오게 됩니다.

<img width="600" alt="스크린샷 2024-06-10 03 17 08" src="https://github.com/seohag/survey101-client/assets/126459089/75f570ef-6d50-4edb-982b-01a715e6692c">

- 대쉬보드(관리자) 페이지에선 생성된 설문들을 수정하고, 삭제할 수 있는 기능이 있고 드롭다운 메뉴를 통해 편리하게 설문들을 관리할 수 있습니다.

<br>
<br>

**설문 생성페이지**: 사용자는 설문 커버, 스타일, 내용(질문), 마무리 섹션별로 설문 양식을 커스터마이징해서 생성할 수 있습니다.

<img width="600" alt="스크린샷 2024-06-10 03 06 22" src="https://github.com/seohag/survey101-client/assets/126459089/7c970a4c-e45a-49ab-9002-1860980fb1b2">

- 커버 섹션은 설문 양식의 인트로를 커스터마이징 할 수 있습니다.

<br>

<img width="600" alt="스크린샷 2024-06-10 03 06 42" src="https://github.com/seohag/survey101-client/assets/126459089/06362710-c043-446e-8d00-863c3ed64a5c">

- 스타일 섹션은 설문 양식의 색상, 버튼 모양, 애니메이션을 커스터마이징 할 수 있습니다.

</br>

<img width="600" alt="스크린샷 2024-06-10 03 08 35" src="https://github.com/seohag/survey101-client/assets/126459089/c9a82a43-01f7-45b9-8b75-1e248102a80e">
<img width="600" alt="스크린샷 2024-06-10 03 09 18" src="https://github.com/seohag/survey101-client/assets/126459089/9afcfe28-b773-46a0-831e-43fcee469497">

- 내용 섹션은 설문의 질문을 커스터마이징 할 수 있으며, 질문 타입에 따라 질문들을 생성 할 수 있습니다.

</br>

<img width="600" alt="스크린샷 2024-06-10 03 09 57" src="https://github.com/seohag/survey101-client/assets/126459089/ad0d9038-b37b-4140-b675-ed99a9a569d2">

- 마무리 섹션은 설문 양식의 아웃트로를 텍스트 에디터를 통해 커스터마이징 할 수 있습니다.

</br>

**링크를 통한 공유**

<img width="600" alt="스크린샷 2024-06-10 03 12 07" src="https://github.com/seohag/survey101-client/assets/126459089/bcdbf797-e4bd-4896-8c30-b63a9394db16">

- 생성된 설문 양식은 링크를 통해 설문 대상자들에게 공유 가능합니다.

<br>

**공유된 설문에 대한 답변페이지**

<img width="600" alt="스크린샷 2024-06-10 03 14 15" src="https://github.com/seohag/survey101-client/assets/126459089/92a6a4b8-9752-4604-9b53-144009d4c769">

- 링크를 통해 공유된 설문은 설문 대상자들이 응답할 수 있습니다.

<br>

**응답결과 시각화 페이지**

<img width="600" alt="스크린샷 2024-06-10 03 15 05" src="https://github.com/seohag/survey101-client/assets/126459089/c28e14d9-002d-4759-bd57-c1ff20868632">
<img width="600" alt="스크린샷 2024-06-10 03 15 42" src="https://github.com/seohag/survey101-client/assets/126459089/a98a5068-1014-4f59-b85a-64b886b8cd41">

- 설문 대상자들에게 답변을 받으면 응답받은 결과들을 테이블이나 차트형식으로 시각화를 도와줍니다.

<br>
<br>

# 🔨 테크 스택

![](https://img.shields.io/badge/Javascript-%23323330.svg?style=flat-square&logo=javascript&logoColor=%23F7DF1E)
![](https://img.shields.io/badge/React-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![](https://img.shields.io/badge/React%20Query-FF4154?style=flat-square&logo=react%20query&logoColor=white)
![](https://img.shields.io/badge/Zustand-black?style=flat-square&logo=React&logoColor=black)
![](https://img.shields.io/badge/Tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)

![](https://img.shields.io/badge/Node.js-6DA55F?style=flat-square&logo=node.js&logoColor=white)
![](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=flat-square&logo=mongodb&logoColor=white)
![](https://img.shields.io/badge/Express.js-%23404d59.svg?style=flat-square&logo=express&logoColor=%2361DAFB)

![](https://img.shields.io/badge/Netlify-%23000000.svg?style=flat-square&logo=netlify&logoColor=#00C7B7)
![](https://img.shields.io/badge/AWS%20EB-%23FF9900.svg?style=flat-square&logo=amazon-aws&logoColor=white)
![](https://img.shields.io/badge/AWS%20S3-%23FF9900.svg?style=flat-square&logo=amazon-aws&logoColor=white)

![](https://img.shields.io/badge/React%20Dom%20Testing-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![](https://img.shields.io/badge/Vitest-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
![](https://img.shields.io/badge/-jest-%23C21325?style=flat-square&logo=jest&logoColor=white)

<br>

### 리액트는 왜 쓸까?

리액트를 왜 사용하느냐에 대한 질문을 스스로 해보니, 가장 인기있어서 라는 이유만으로는 명확한 답변이 되지 않아, 리액트의 장점과 왜 사용하는지 여러 자료들을 조사 해보았습니다. 우선 npm trends의 그래프를 보니 여전히 리액트가 뷰와 앵귤러보다 많은 다운로드 수를 기록하고 있었습니다. 아직 많은 기업들이 리액트 개발자를 필요로 하는것은 증명이 된 것이고, 단지 여러 곳에서 많이 사용한다는 이유말고도 다른 이유들을 몇가지 찾아보았습니다.

리액트만의 장점은 아니지만 SPA, CSR은 리액트의 주요한 장점이긴 합니다. SSR을 사용할 때에는 변화가 있을 때마다 새롭게 전체 페이지를 다시 로드해야해서 비효율적이란 단점이 있었지만, CSR은 SSR과 달리 서버로부터 데이터를 받아서 클라이언트에서 렌더링 하는 방식이기 때문에 바뀐 부분의 데이터가 있는 화면만 새롭게 렌더링함으로서 사용자 경험을 높여주는 장점이 있습니다. 또한 리액트는 CSR과 SSR을 함께 사용할 수 있다는게 다른 프레임워크보다 인기 있었던 이유 중 하나 입니다.

리액트는 화면 한 부분 부분들을 컴포넌트 단위로 나눌 수 있으며 독립적으로 관리할 수 있습니다. 이는 역할과 기능에 따라 관리하기 용이하단 이야기이고, 반복되는 부분을 대체할 수 있게 해주며 코드 재사용성을 높여주는 장점이 있습니다. 그리고 가상돔으로 인한 빠른 속도 또한 장점입니다. 가상돔을 이용해 실제 DOM 조작하는 횟수를 줄여주는데, 데이터가 변경되면 -> 가상 DOM을 렌더링하고 -> 이전 가상 DOM과 비교해 -> 변경된 부분을 실제 DOM에 적용하는 렌더링 방식을 제공하며 애플리케이션의 규모가 클수록 더 많은 횟수를 줄여준다고 합니다.

다른 큰 장점은 바로 선언형과 간결성입니다. 상호작용이 많은 UI를 만들 때 생기는 어려움을 줄여주고, 각 상태에 대한 간단한 뷰만 설계할 수 있도록 도와줍니다. React는 데이터가 변경됨에 따라 적절한 컴포넌트만 효율적으로 갱신하고 렌더링합니다. 이로인한 선언형 뷰는 코드를 예측 가능하고 디버깅하게 쉽게 만들어줍니다. 또한 리액트는 Controller, Model을 사용하는 대신 Flux 구조에 따라 Action -> Dispatcher -> Store의 단방향 데이터 흐름을 사용함으로써 오직 View에만 집중할 수 있는 장점또한 있습니다.

간략하긴 하지만 이러한 조사한 내용들로 React가 어떠한 장점들이 있는지 알게 되었고, 단지 많이 사용한다는 이유만이 아닌 여러 가지 장점들을 찾아보니 "아직은 리액트를 사용하는 것이 적절하겠구나" 라는 판단하에 리액트를 프로젝트에 사용하는 것으로 결정하게 되었습니다.

<img width="500" height="230" alt="스크린샷 2024-06-03 19 28 37" src="https://github.com/seohag/survey101-client/assets/126459089/685442c7-141e-411f-a05a-df1672cc8ebf">
<img width="500" height="230" alt="스크린샷 2024-06-03 10 23 45" src="https://github.com/seohag/survey101-client/assets/126459089/e8a2bf5b-dec0-46f0-a922-6d3162f18195">

<br>

### Vite는 왜 사용했을까?

리액트 프로젝트를 생성하기 위한 방법들을 찾아보았고, CRA, Vite, Webpack 등을 사용해서 프로젝트를 생성할 수 있다는 것을 찾아보았습니다. 세가지 툴의 장단점을 조사해았고, 타 비교 군들과 비교해 Vite가 여러 측면에서 장점들을 더 가지고 있었습니다.

CRA는 사용하지 않는 기능들까지 모두 설치되기 때문에 모듈 사이즈가 크다는 단점이 있고 커스텀 빌드를 하는 것이 어렵습니다. 또한 빌드 시간이 Vite에 비해 많이 느렸습니다. 다른 대표적인 번들러 WebPack 과 비교했을 땐 Webpack은 초기 빌드 속도가 느릴 수 있지만, Vite는 개발 서버를 통해 빠른 번들링 속도를 제공하고 파일을 필요할 때마다 필요한 모듈만 번들링하여 신속한 개발이 가능하다고 조사했습니다. Vite가 빠른 이유는 dependencies(Esbuild) 그리고 source code 두 가지 카테고리로 나누어 개발 서버를 시작하기 때문이라고 조사했습니다.

기본적으로 Hot Module Replacement(앱을 종료하지 않고 갱신된 파일만을 교체하는 방식)을 포함한 빠르고 간단한 개발 서버를 제공하며 기본 환경설정이 간단했고, 프로덕션 빌드 시 Rollup을 사용하여 코드를 최적화합니다. 불필요한 코드를 효과적으로 트리쉐이킹하여 제거하고, 결과물의 파일 크기를 최소화 하는 장점도 있었습니다.

이렇게 Vite가 타 비교군에 비해 많은 장점을 가졌기에, Vite를 번들러로 선정 후 프로젝트를 진행하였습니다.

<br>

| 기능/특징            | Vite                          | Webpack                         | CRA                             |
| -------------------- | ----------------------------- | ------------------------------- | ------------------------------- |
| 초기 빌드 속도       | 빠름 (Esbuild를 이용)         | 느림                            | 보통 (Webpack 사용)             |
| 개발 서버 속도       | 빠름 (HMR 포함)               | 보통 (HMR 포함)                 | 느림 (HMR 포함)                 |
| 모듈 번들링          | 필요할 때마다 번들링          | 전체 모듈 번들링                | 전체 모듈 번들링                |
| 커스텀 빌드          | 상대적으로 쉬움               | 중간                            | 어려움                          |
| 환경설정             | 간단                          | 복잡                            | 복잡                            |
| 프로덕션 빌드 최적화 | Rollup을 사용하여 최적화      | 다양한 플러그인을 통한 최적화   | CRA 설정에 따라 다름            |
| 트리 쉐이킹          | 효과적으로 불필요한 코드 제거 | 일부 기능을 제공 (Tree Shaking) | 일부 기능을 제공 (Tree Shaking) |
| 파일 크기 최소화     | 효과적으로 최소화             | 일부 최적화                     | 일부 최적화                     |

<br>

### React Query 그리고 Zustand는 왜 사용했을까?

설문을 커스터마이징 하고, 커스터마이징한 설문을 데이터베이스에 저장하고 불러오는 등의 작업들을 하다보면 클라이언트와 서버와의 상호작용이 잦았습니다. 설문 양식을 생성, 수정, 삭제 하는 등 CRUD 작업이 많은 프로젝트였기에 클라이언트에 저장되는 데이터들은 변화되기 쉬운 성격을 가지고 있었습니다. 서버와 클라이언트 간의 데이터가 같은 데이터임에도 시점 차이로 인한 클라이언트와 서버와의 데이터가 달라질 수 있는 상황이 있을 수 있기에 데이터의 정확성과 일관성 유지를 위해 클라이언트와 서버의 상태를 분리해서 관리했고, `React Query`의 상태관리의 이점들을 활용하고자 선택하였습니다.

`React Query` 는 캐싱 기능 또한 제공 해주는데, 서버에서 가져온 데이터를 queryClient에 담아 클라이언트에서 서버 측으로 다른 요청이 없는 한 다시 서버로 재요청하지 않고, 캐싱되어있던 데이터를 다시 반환해주기 때문에 불필요한 요청을 최소화할 수 있는 장점도 있었습니다. fresh / stale 을 기준으로 데이터의 상태가 최초에 서버로부터 전달받아 캐싱되어 있던 상태라는 가정하에 만료되었다면 재요청하고, 만료되지 않았다면 캐싱된 데이터를 반환하는 메커니즘을 가지고 있습니다. 따라서 캐싱이 필요한 컴포넌트마다 `React Query` 의 queryClient와 만료시간을 활용해서 재요청을 최소화 하는 용도로 사용하였습니다.

**Survey101** 에서는 다양한 형태의 질문, 각 질문에 대한 옵션, 응답 데이터 등을 관리해야 했고, 이런 복잡한 상태를 효율적으로 관리할 상태관리 툴이 필요했습니다.

`Zustand` 는 중앙집중화된 하나의 store 안에 여러 상태들을 담고, Top-down 방식으로 Flux 원칙을 적용한 상태관리를 적용하며 간단한 상태 관리 방법을 제공해줍니다. 사용자가 설문에 대한 질문을 추가하거나 수정할 때 다른 부분의 상태와 충돌 없이 일관된 상태를 유지해야 하는 이유도 있었고, 설문조사를 커스터마이징 하는 화면에서 여러 컴포넌트가 동일한 상태를 공유하고 업데이트 해야했기에, `Zustand`를 사용해서 전역상태로 공유하였습니다. 또한 스토어의 상태 변경이 일어날 때 리스너 함수를 모았다가 상태가 변경되면 그때 리스너들에게 상태가 변경되었다고 알려줍니다. 상태의 변경,조회,구독 등을 통해서만 스토어를 다루고, 실제 상태는 컴포넌트 생명주기 내에 의도지 않게 변경되는 것을 막아줍니다.

또한 selector 함수로 가져온 상태는 store에 중앙집권화 되어있는 상태와 독립적으로 관리되기 때문에 컴포넌트가 필요한 상태에 집중할 수 있고, 상태의 변경에 따라 필요한 부분만 업데이트 되는 이유와, 별도의 리듀서, 액션, 미들웨어 없이 상태관리가 가능하고, 컴포넌트 간의 상태 공유를 용이하게 해주는 장점이 있다고 조사했습니다.

```jsx
import { create } from "zustand";

const useFormEditorStore = create((set) => ({
  activeSection: "cover",
  coverData: {
    title: "설문지",
    subtitle: "",
    startButtonText: "설문 시작하기",
    coverImage: null,
  },
  styleData: {
    themeColor: "#000000",
    buttonShape: "rounded-full",
    animation: "fade",
  },
  endingData: {
    title: "설문 완료",
    content: "결과에 대한 내용을 입력해주세요.",
  },
  questions: [
    {
      questionId: uuidv4(),
      questionType: "imageChoice",
      questionText: "",
      options: [{ optionId: uuidv4(), image: null }],
    },
  ],

  setActiveSection: (section) => set({ activeSection: section }),
  setCoverData: (data) => set({ coverData: { ...data } }),
  setStyleData: (data) => set({ styleData: { ...data } }),
  setEndingData: (data) => set({ endingData: { ...data } }),
  setQuestions: (data) => set({ questions: data }),
}));

export default useFormEditorStore;
```

조사한 내용들을 바탕으로 `React Query`로는 서버 데이터 페칭 및 캐싱을 담당하게 했고, `Zustand`로는 클라이언트 상태 관리 및 UI 업데이트를 담당하며 명확한 책임 분리를 하여 상태관리를 하였습니다.

<br>

### 왜 FormData를 사용해서 작업했을까?

우선 사용자 경험적인 측면 때문이였습니다. 기존에 HTML에 내장된 form으로 작업을 했을 땐 form이 제출될 때 페이지가 리로드 되는 현상이 있었습니다. 그러나 FormData는 페이지 리로드 없이 서버로 데이터를 전송할 수 있었기 때문에 해당 방식으로 작업을 하였습니다.

또다른 이유는 저의 프로젝트의 데이터 구조상 FormData가 적합했습니다. 서버에 전송하는 데이터 구조가 아래의 사진과 같았기에 (중첩된 구조), 파일 객체들과 옵션 ID를 자바스크립트로 조작할 수 있는 FormData를 선택 후 사용하였습니다.

그리고 리액트에서 유명한 Form 라이브러리인 Formik과 React-Hook-Form 특징들을 조사해보고 사용도 고려했었습니다.

**Formik**은 form이 필요한 컴포넌트를 `<Formik>` 태그로 감싸서 props drilling 없이 컴포넌트 내에서 전역적으로 상태관리를 할 수 있는 장점이 있고, Controlled Component 방식으로 동작합니다.

**React-Hook-Form**은 Uncontrolled Component 방식으로 동작하기 때문에 렌더링 횟수가 적다는 특징이 있습니다. 따라서 웹 퍼포먼스 향상에 직결되는 장점이 있지만, 기본적으로 form안의 값을 제어하기 위해선 ref를 사용해서 접근해야 하는 방식을 가지고 있습니다.

그러나 라이브러리 사용은 지양하는 쪽으로 프로젝트를 진행방향을 정했기에, HTML 내장 Form과 FormData를 꼼꼼히 비교 후 Survey101에 적합했던 FormData를 사용하기로 결정했습니다.

<img width="500" height="330" alt="스크린샷 2024-05-17 06 03 57" src="https://github.com/seohag/survey101-client/assets/126459089/175d3efc-ea4b-4f1f-9ed6-999273468e35">
<img width="500" height="330" alt="스크린샷 2024-05-17 06 04 27" src="https://github.com/seohag/survey101-client/assets/126459089/0d4ef465-50c4-44b0-940f-d2aa38e18115">

<br>

| **특성**             | **HTML Form**                                             | **FormData**                                  |
| -------------------- | --------------------------------------------------------- | --------------------------------------------- |
| **구현 방식**        | `<form>` 태그와 HTML 요소들로 구현                        | 자바스크립트의 `FormData` 객체로 구현         |
| **데이터 전송 방법** | 폼 제출 시 브라우저가 자동으로 전송                       | Axios 또는 Fetch API를 사용한 비동기 전송     |
| **페이지 리로드**    | 기본적으로 페이지 리로드가 발생                           | 페이지 리로드 없이 비동기 전송 가능           |
| **동적 데이터 추가** | 폼 제출 전 데이터 조작이 어려움                           | 자바스크립트를 통해 동적으로 데이터 추가 가능 |
| **파일 업로드 지원** | 지원 (enctype="multipart/form-data")                      | 지원                                          |
| **데이터 포맷**      | 기본적으로 URL 인코딩 (application/x-www-form-urlencoded) | 멀티파트 폼 데이터 (multipart/form-data)      |
| **사용 편의성**      | HTML만으로 쉽게 구현 가능                                 | 자바스크립트 코딩이 필요                      |
| **유연성**           | 폼 요소 추가/수정에 제한적                                | 동적 폼 요소 추가/수정에 유연함               |

<br>
<br>

# 🏔 기술적 챌린지

## 컴포넌트 모듈화

### 가독성이 좋지 않은 코드와 동일한 코드 반복 작성:

프로젝트를 진행하던 중, 설문 미리보기, 그리고 답변 페이지가 비슷한 UI를 사용함에도 불구하고 동일한 코드를 반복해서 조건부 렌더링으로 처리하고 있었습니다. 이러한 처리 방식은 코드 중복 작성을 초래했고, 유지 보수성을 떨어뜨리며 가독성을 저하시키는 문제점이 있었습니다.

### 합성 컴포넌트 패턴으로 컴포넌트 분리:

컴포넌트 분리에 대해 여러 정보들을 찾아보던 중 합성 컴포넌트 패턴이 문제를 해결하기에 적합하다는 판단 하에 프로젝트에 적용해보았습니다.

우선 아래 예시 코드를 보았을 때, `QuestionPreview` 라는 컴포넌트 내에서 (textChoice, imageChoice 등)을 조건부 렌더링으로 처리하면서 코드가 복잡해지고, 특정 질문 타입을 수정할 때마다 `QuestionPreview` 컴포넌트의 모든 코드를 읽으며 특정 질문 타입을 찾아서 직접적으로 수정해야만 했습니다.

<br>

```jsx
import CustomButton from "../CustomButton";

function QuestionPreview({ selectedQuestionId }) {
  const { questions, styleData } = useFormEditorStore();
  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        {selectedQuestion && (
          <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[350.594px]">
            <h3 className="text-xl font-bold mb-4">
              {selectedQuestion.questionText}
            </h3>
            {selectedQuestion.questionType === "textChoice" && (
              <div className="mt-4 flex flex-col items-center">
                {selectedQuestion.options.map((option) => (
                  <CustomButton
                    key={option.optionId}
                    text={option.text}
                    themeColor={styleData.themeColor}
                    buttonShape={styleData.buttonShape}
                  />
                ))}
              </div>
            )}
            {selectedQuestion.questionType === "imageChoice" && (
              <div className="flex flex-wrap justify-center mt-4">
                {selectedQuestion.options.map((option) => (
                  <button key={option.optionId} className="mb-4 mx-2">
                    {option.image && (
                      <img
                        src={
                          typeof option.image.imageUrl === "string"
                            ? option.image.imageUrl
                            : URL.createObjectURL(option.image)
                        }
                        alt={`${option.optionId}`}
                        className="w-24 h-24 object-cover"
                      />
                    )}
                  </button>
                ))}
              </div>
            )}
            ...
          </div>
        )}
      </div>
    </div>
  );
}
export default QuestionPreview;
```

- 기존에 동일한 코드를 반복해서 조건부 렌더링으로 처리해서 가독성이 떨어지던 코드 (as-is)

<br>

```jsx

import TextChoiceQuestion from "./TextChoiceQuestion";
import ImageChoiceQuestion from "./ImageChoiceQuestion";
import TextInputQuestion from "./TextInputQuestion";
...

const questionComponents = {
  textChoice: TextChoiceQuestion,
  imageChoice: ImageChoiceQuestion,
  textInput: TextInputQuestion,
  ...
};

function QuestionPreview({ selectedQuestionId }) {
  const { questions, styleData } = useFormEditorStore();
  const selectedQuestion = questions.find(
    (question) => question.questionId === selectedQuestionId,
  );

  if (!selectedQuestion) {
    return null;
  }

  const SpecificQuestionComponent = questionComponents[selectedQuestion.questionType];

  return (
    <div className="bg-gray-200 rounded-lg shadow-lg p-4 flex justify-center items-center min-h-[642px]">
      <div className="text-center">
        <div className="p-4 border border-gray-300 rounded min-h-[572px] min-w-[351px]">
          <h3 className="text-xl font-bold mb-4">
            {selectedQuestion.questionText}
          </h3>
          {SpecificQuestionComponent && (
            <SpecificQuestionComponent
              styleData={styleData}
              options={selectedQuestion.options}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionPreview;
```

- 합성 컴포넌트 패턴을 적용시켜 관심사를 분리한 코드 (to-be)

<br>

```plaintext
QuestionPreview
│
├── import TextChoiceQuestion from "./TextChoiceQuestion"
├── import ImageChoiceQuestion from "./ImageChoiceQuestion"
├── import TextInputQuestion from "./TextInputQuestion"
...
│
├── const questionComponents = {
│   ├── textChoice: TextChoiceQuestion
│   ├── imageChoice: ImageChoiceQuestion
│   ├── textInput: TextInputQuestion
│   ...
│   }
│
├── function QuestionPreview({ selectedQuestionId })
│   ├── useFormEditorStore()
│   │   ├── questions
│   │   └── styleData
│   │
│   ├── const selectedQuestion = questions.find(
│   │     └── (question) => question.questionId === selectedQuestionId
│   │   )
│   │
│   ├── const SpecificQuestionComponent = questionComponents[selectedQuestion.questionType]
│   │
│   └── return (
│       ├── <div>
│           ├── <div>
│               ├── <div>
│                   ├── <h3>
│                   │   └── {selectedQuestion.questionText}
│                   │
│                   ├── {SpecificQuestionComponent && (
│                   │   ├── <SpecificQuestionComponent
│                   │   │   ├── styleData={styleData}
│                   │   │   └── options={selectedQuestion.options}
│                   │   └── )}
│                   └── )}
│
└── export default QuestionPreview
```

- `QuestionPreview` 컴포넌트 계층 구조

<br>

### 컴포넌트를 분리한 결과:

합성 컴포넌트 패턴을 이용하여 분리한 코드에서는 각 질문 타입에 해당되는 컴포넌트에 역할을 위임하며 이를 통해 질문 타입들마다 컴포넌트를 독립적으로 관리할 수 있고, 기존코드에 비해 가독성을 향상 시켰습니다. 또한 질문 미리보기와 비슷한 설문에 대한 답변을 하는 컴포넌트에서도 동일한 패턴을 이용해서 재사용성과 유연성을 향상 시킬 수 있었습니다. 기존의 코드에선 하나의 컴포넌트에서 많은 책임을 지고 있었기에 유지보수 할 때 모든 코드를 살펴봐야 했지만, 컴포넌트를 분리함으로써 단일 책임 원칙을 지킬 수 있게끔 하였습니다.

컴포넌트를 작성할때 리액트의 여러 디자인 패턴들을 활용하여 컴포넌트를 분리함으로써 코드의 재사용성을 높이고 유지 보수성을 향상 시켜야 한다는 점을 배웠습니다. 이러한 패턴들을 사용하게되면 각 컴포넌트가 명확한 역할과 책임을 가지게 되어 유지보수가 용이해집니다. `QuestionPreview` 컴포넌트를 예로 들었을 때, 새로운 질문 타입이 추가될 때도 기존 코드를 최소한으로 수정하여 확장시킬 수 있었고, 앞으로도 이런 컴포넌트를 나누는 패턴들을 적극 활용하여 보다 모듈화되고 관리하기 쉬운 코드를 작성해야겠다고 느꼈습니다.

<br>

## 설문 데이터 구조 설계

### 프로젝트에 적합한 데이터 구조는 무엇일까?:

데이터 구조 및 스키마를 설계하는 방법을 잘 알지 못했기에 설문에 대한 데이터 스키마 모델링을 하기 위해선 어떤 데이터 구조로 설계하는 것이 가장 효율적이고, 적절한 방식인지에 대한 고민으로 시작했습니다.

### MongoDB의 Embedding 방식과 Reference 방식 조사:

Survey101는 설문조사를 커스터마이징 하고, 관리하는 특성을 가지고 있는 프로젝트입니다. 즉 한명의 유저가 여러개의 설문 양식을 만들고, 만들어 놓은 여러 설문들을 관리할 수 있는 기능을 가지고 있기에 한명의 유저가 많은 설문을 생성하는 1 대 다 관계로 설정하는 방식을 선택했습니다. 또한 MongoDB의 데이터 구조 모델을 찾아보는 중 **embedding** 방식과 **reference** 방식을 찾게되었고, 두 방식은 아래와 같은 장단점과 특징을 가지고 있다는 것을 조사했습니다.

**embedding** 방식은 하나의 요청으로 하나의 문서에 관련된 데이터에 모두 접근할 수 있으며, embedding 모델을 사용하면 애플리케이션이 동일한 데이터베이스 관련 정보를 쿼리할 수 있고, 필요한 쿼리 및 업데이트 횟수를 줄일 수 있다는 장점을 가지고 있었습니다. 그러나 너무 많이 중첩되는 형태가 될 수 있고, 용량 크기 제한이 있습니다.

**reference** 방식은 데이터 간의 관게를 저장하며, 데이터가 여러 컬렉션으로 나뉘고 중첩되지 않기 때문에 데이터가 정규화 되어 있고 유연합니다. 대신 한번의 쿼리로 모든 데이터를 읽어오지 못하기 때문에 읽는 속도는 embedding 방식보단 느리고, 연결된 데이터가 바뀔 때 일관성 유지가 어렵습니다.

<br>

| 특성              | Reference 방식                             | Embedding 방식                                |
| ----------------- | ------------------------------------------ | --------------------------------------------- |
| **데이터 구조**   | 관련 데이터를 별도의 도큐먼트로 저장       | 관련 데이터를 하나의 도큐먼트에 중첩시켜 저장 |
| **데이터 일관성** | 여러 도큐먼트에 분산되어 있어 관리가 복잡  | 단일 도큐먼트 내에 있어 관리가 용이           |
| **쿼리 복잡도**   | 조인을 사용한 복잡한 쿼리가 필요할 수 있음 | 단일 도큐먼트 조회로 간단한 쿼리 가능         |
| **성능**          | 읽기 성능이 다소 낮을 수 있음              | 읽기 성능이 우수                              |
| **쓰기 성능**     | 쓰기 성능이 우수                           | 쓰기 성능이 다소 낮을 수 있음                 |
| **데이터 중복**   | 데이터 중복이 없음                         | 데이터 중복 가능                              |
| **변경 빈도**     | 자주 변경되는 데이터에 적합                | 자주 변경되지 않는 데이터에 적합              |
| **데이터 크기**   | 큰 데이터를 효과적으로 처리 가능           | 도큐먼트 크기가 제한을 초과할 수 있음         |
| **관계 유형**     | 복잡한 다대다 관계를 표현하는 데 적합      | 단순한 일대다 관계를 표현하는 데 적합         |

<br>

### 데이터 구조 설계 조사 후 적용결과:

결과적으로 이러한 차이점을 가지고 있는 부분을 학습해서 Survey101의 설문 데이터는 데이터가 매우 크거나 복잡하다는 이유로 하나의 도큐먼트에 담기 어렵지 않고, 여러 설문조사에 걸쳐 동일한 질문이나 옵션을 재사용하는 경우가 없다는 등의 특성을 고려해서 Embedding 방식을 사용한 데이터 구조를 적용시켰습니다.

앞으로도 이러한 방식으로 프로젝트에 적합한 데이터 구조들을 조사 및 비교해보면서 각 데이터 구조들의 특성을 고려해 스키마를 작성해야겠다고 배웠습니다. 최적의 데이터 구조를 선택하는게 결국 프로젝트의 성능과 확장성을 지속적으로 개선시키는 것이기 때문에, 이러한 데이터베이스 모델과 설계 방식을 항상 고려하며 프로젝트에 가장 적합한 솔루션을 찾아내고, 이를 효과적으로 적용하는 것을 목표로 꼼꼼히 조사하는 습관을 기르는 것을 연습해야겠다는 점을 느꼈습니다.

<br>

<img width="700" alt="스크린샷 2024-05-17 07 24 01" src="https://github.com/seohag/survey101-client/assets/126459089/5f1a9d3a-e6f4-4793-bccd-d44d1d859466">

<br>

## 사용자가 설문 문항에 필요한 여러 장의 이미지를 업로드 하는 과정에서의 에러 핸들링

우선 POC 단계에서 이미지파일을 어떠한 방식으로 다룰 수 있을까 고민을 했었습니다. 기존에 MongoDB를 사용해본 기억이 있어 MongoDB를 사용한 이미지 파일 방법들을 조사해보았습니다. Binary JSON 데이터로 변환하여 (Base64 인코딩) 데이터베이스 도큐먼트 내에 직접 저장하는 방식이 있었고, 외부 파일 스토리지와 연동하여 저장하는 방법이 있었습니다.

BSON 데이터로 변환하여 이미지 파일을 MongoDB 도큐먼트 내에 직접 저장하는 방식으로 하려니 16MB로 문서 크기 제한이 있었고, 대용량 바이너리 데이터를 처리하기엔 한계가 있었습니다. 또한 Base64로 인코딩하게 되면 원래 크기보다 커지기 때문에 저장 공간이 빠르게 소진되는 단점이 있었습니다.

AWS S3는 CDN(Content Delivery Network)과 통합하여 안정적인 이미지 전달이 가능하고, 대규모 이미지 파일을(최대 5TB) 효율적으로 저장하며, 고가용성 및 내구성, 확장성이 뛰어난 장점을 갖고 있습니다. 또한 **imageUrl**과 **key**값 등을 제공해주기 데이터베이스에 url, key 값들만 저장해 클라이언트에서 사용하기 편한 장점이 있었습니다. 이러한 이유들로 인해 AWS S3 bucket에 이미지 파일들을 업로드 하는 방법을 택했습니다.

<img width="700" alt="스크린샷 2024-06-03 19 53 26" src="https://github.com/seohag/survey101-client/assets/126459089/68f6c943-ab04-41ba-b1e4-b57aa72475cc">

### 어떠한 에러인지 클라이언트에서 알지 못했다:

서버 측에서 AWS S3에 이미지 파일 데이터를 업로드 할 때, `Promise.all`을 이용하여 이미지를 여러장 병렬적으로 업로드 하게되면 여러 개의 데이터 중 하나만 업로드되지 않아도 모든 데이터들이 업로드되지 않으며 함수 실행이 중단되었습니다. 그러나 이미지 업로드 함수 실행이 종료되어도 클라이언트 측에선 이미지 업로드 에러인지 서버 측의 다른 에러인지 알지 못했기에 설문이 생성완료 되었다는 모달창이 뜨는 문제점이 있었습니다.

### 정확한 에러 전달과 해당 에러에 맞는 분기 처리:

```js
async function uploadImageToS3(file, optionId) {
  const s3Client = getS3Client();
  const imageId = optionId || uuidv4();
  const bucketName = process.env.AWS_BUCKET_NAME;
  const putObjectCommand = getPutObjectCommand(
    bucketName,
    imageId,
    file.buffer,
  );

  try {
    await s3Client.send(putObjectCommand);
    const imageUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageId}`;

    return { imageId, imageUrl };
  } catch (error) {
    res.status(503).json({ message: "이미지 업로드 실패" });
    console.error("S3에 업로드 하는데 실패:", error);
  }
}
```

위와 같은 방식으로 AWS S3가 업로드 되는 도중에 에러가 발생하면 `503` 상태코드와 함께 "이미지 업로드 실패" 라는 메시지를 클라이언트 측으로 정확한 에러전달을 해주었습니다.

```js
const { mutateAsync: fetchSurvey } = useMutation({
  mutationFn: handleFetchSurvey,
  useErrorBoundary: true,
  onSuccess: (data) => {
    setSurveyUrl(data);
    navigate("dash");
  },
  onError: (error) => {
    if (
      error.response.message === "이미지 업로드 실패" ||
      error.response.status === 503
    ) {
      setErrormessage(
        "이미지를 업로드 하는 동안 에러가 발생했습니다. 잠시 후 다시 시도해주세요.",
      );
      return;
    }
  },
});
```

클라이언트 측에서는 서버로 api 요청을 보냈을 때 `useMutation` 훅 내에서 `onError` 옵션을 이용하여 `error.response`의 결과에 따라 명확한 에러핸들링을 해주는 방식으로 코드를 작성해보았습니다.

### 에러핸들링 결과:

에러핸들링을 해줌으로써 이미지 업로드를 하는 비동기 작업간에 에러가 난다면 AWS S3 bucket에 업로드 하는 과정에서 에러가 났는지, 서버 측의 다른 부분에서 에러가 났는지 확실히 알 수 없기 때문에 클라이언트로 유의미한 에러를 전달하였고, 정확한 에러핸들링을 할 수 있게끔 하였습니다. 이로 인해 에러조차 알 수 없는 상황을 방지하여 개발자 경험과 유저 경험을 향상 시켰습니다. 에러에 대한 분기처리를 해주지 않았을 땐 원인모를 에러를 계속 찾았고, 결국 디버깅에 많은 시간을 썼어야 하는걸 직접 느꼈기 때문에 코드 작성에 있어서 에러핸들링은 매우 중요하다는 점을 배웠습니다.

<br>

## 사용자가 매인 페이지에 들어와서 설문 데이터를 서버에 요청할 때의 에러 핸들링

네트워크 오류로 인한 API 에러가 발생했을 때

### React Query의 'onError'의 한계를 느껴 다른 에러처리 방식 도입

React Query의 `onError` 옵션을 사용하면 비동기 작업에서 발생하는 에러를 핸들링할 수 있지만 이 방법에는 몇 가지 한계가 있었습니다.

1. DashBoard 페이지에서 설문 데이터들을 가져오는 작업에 대한 에러 핸들링을 `onError` 옵션을 통해 해주지 않았어서 전체 앱이 멈췄던 상황이 있었습니다.

2. 또한 전역 에러 핸들링에 대한 어려움이 있었습니다. 각각의 `useMutation` 혹은 `useQuery` 훅에 개별적으로 `onError`를 정의해야 했고, 코드가 복잡해졌습니다.

3. 매번 로딩과 에러 상태를 확인하고 정의하는 반복 작업이 필요했습니다.

4. 에러 UI 관리의 어려움: 각 훅에서 에러를 처리하므로, 일관된 에러 UI를 관리하기 어려웠습니다.

이러한 한계점들을 보완하기 위해 리액트의 `ErrorBoundary`를 조사하고 선언적 에러핸들링 방법을 적용해보았습니다.

기본적으로 비동기 작업의 목표는 서비스가 멈추지 않고 다른 작업을 동시에 수행할 수 있게 하기 위함입니다. 만약 로딩이나 에러가 발생했을 때 서비스가 멈춘다면 사용자 경험에 좋지 않은 영향을 줄 것이고, API 요청이 있는 컴포넌트에 부분적으로 로딩, 에러 상태를 보여주는 것이 좋은 설계라고 조사했습니다.

우선 에러바운더리를 사용하면 컴포넌트 트리의 특정 부분에서 발생하는 에러를 포착하고 처리할 수 있습니다. 에러바운더리로 감싼 하위 컴포넌트에서 throw된 에러를 catch하고 Fallback UI를 렌더링 할 수 있습니다.

```jsx
import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("에러가 발생했습니다:", error, errorInfo);
  }

  render() {
    const { hasError, error } = this.state;
    const { errorFallback, children } = this.props;

    const isErrorExist = hasError && error !== null;
    cosnt fallbackUI = (err) => errorFallback({ error: err });

    if (isErrorExist) {
      return fallbackUI(error);
    }

    return children;
  }
}

export default ErrorBoundary;
```

`ErrorBoundary`는 class 컴포넌트의 생명주기 메서드를 이용하여 에러를 catch 하는 동작 원리를 갖고 있기 때문에 class 컴포넌트로만 구현 할 수 있습니다.

</br>

```jsx
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <Route
      path="/dash"
      element={
        <ErrorBoundary>
          <DashBoardPage />
        </ErrorBoundary>
      }
    />
  );
}
```

### 에러바운더리를 활용한 에러 핸들링 결과

앞서 이야기 했듯이 에러 핸들링은 사용자 경험과 개발자 경험 모두에 중요한 영향을 미칩니다. React Query의 `onError` 옵션을 활용하여 개별적인 에러 핸들링을 할 수 있지만, ErrorBoundary를 사용한 선언적 에러 핸들링을 통해 더 일관되고 중앙화된 에러 관리가 가능합니다. 이러한 방식을 통해 코드 중복을 줄이고, 더 효율적인 에러 관리를 할 수 있었습니다. 앞으로도 다양한 에러 시나리오를 테스트해보고, 사용자 친화적인 에러 메시지 제공하는 방법과 에러 핸들링 모범 사례등을 지속적으로 학습하고 개선을 통해 더 나은 에러 핸들링을 구현해보면 좋겠다고 느꼈습니다.

<br>

## 유저 경험과 인터페이스는 어떤 부분을 신경썼을까?

<p align="center">

</p>

### 설문 결과 분석 페이지 뷰 섹션화 (데이터 차트화와 테이블 형식의 인터페이스 제공)

<img width="700" height="400" alt="스크린샷 2024-05-17 06 03 57" src="https://github.com/seohag/survey101-client/assets/126459089/0557f844-3876-4fd1-9088-a7b137cdd406">

- 설문을 커스터마이징 하는 각 섹션마다 임시저장 버튼을 추가했으며, 설문에 대한 질문을 생성할 때 질문추가 버튼을 리모컨 형식으로 만들어 스크롤바를 내릴 때 마다 리모컨이 따라오게끔 구현했습니다.

<img width="700" height="400" alt="스크린샷 2024-05-17 06 03 57" src="https://github.com/seohag/survey101-client/assets/126459089/4ca9467e-570a-4d64-9153-0172c2acf50b">

- 사용자가 설문 결과에 대한 결과를 보기 쉽게끔 테이블 형식으로 뷰를 제공했고, 인사이트를 얻기 위한 차트는 Chart.js를 이용해서 다음과 같이 구현하였습니다.

<br>
<br>

# 🚫 이슈

### 설문 이미지 수정이 되지 않는다.

Survey101 에서는 설문을 생성할 때 이미지 파일을 첨부할 수 있는 기능이 있습니다. 클라이언트에서 formData에 이미지 파일을 담아 서버로 요청을 보내게 되면 서버에선 파일 데이터들을 AWS S3에 업로드 하는 방식으로 진행했었습니다.

그러나 클라이언트에서 질문에 대한 선택지 옵션(이미지 파일)을 추가하는 기능은 잘 작동하는데, 기존에 있던 선택지 옵션을 수정하는 기능은 정상작동 하지 않았습니다.

클라이언트에서 서버로 이미지 파일들을 보낼 때 각 파일들을 구분하기 위해 optionId를 사용해서 같이 보내주고 있는데, 이미지파일을 s3에 업로드 할 때도 클라이언트 측에서 optionId를 키 값으로 bucket에 저장되게끔 로직을 작성했었습니다.

이미지파일을 추가하는 기능은 새로운 optionId가 부여되기 때문에 s3에 업로드 되도 클라이언트 측에서 ImageUrl을 가져올 때 겹치는 ImageUrl이 없기 때문에 정확한 이미지를 가져올 수 있었습니다. 그러나 존재하던 이미지가 수정될 때의 경우는 optionId를 바꿔주지 않았기 때문에 같은 optionId를 가진 ImageUrl이 bucket에 중복저장되고 있었던 상황이였습니다.

그래서 이미지가 AWS S3에 업로드 되었음에도 불구하고, 클라이언트에서 이미지를 보여줄 때 중복된 imageUrl이 있으면 기존에 먼저 있던 bucket에 있는 imageUrl을 먼저 get 해오기 때문에 수정된 이미지가 보이지 않았습니다. 그래서 사용자가 이미지 옵션을 바꿀 때도 새롭게 optionId를 생성해주는 방식으로 코드를 수정했습니다.

서버에선 기존에 있던 이미지파일의 optionId와 수정된 이미지파일의 optionId가 다르면 이미지가 바뀐 것이니 바뀐 이미지를 업로드함과 동시에 존재하던 이미지파일을 AWS S3 Bucket에서도 삭제하고 업데이트 된 데이터만 bucket에 저장되게끔 코드를 수정했습니다.

```jsx
function handleImageChange(event, questionId, optionId) {
  const file = event.target.files[0];

  const reader = new FileReader();

  reader.onload = () => {
    const newOptionId = uuidv4();

    const newQuestions = questions.map((question) => {
      if (question.questionId === questionId) {
        const newOptions = question.options.map((option) => {
          if (option.optionId === optionId) {
            return { ...option, image: file, optionId: newOptionId };
          }

          return option;
        });

        return { ...question, options: newOptions };
      }

      return question;
    });

    setQuestions(newQuestions);
  };

  setErrorMessage("");
  reader.readAsDataURL(file);
}
```

이렇게 설문 이미지 파일에 대한 관리를 적절하게 처리해줌으로써 설문 이미지 수정이 되고 있지 않는 이슈를 해결하였습니다.

<br>

### 배포환경에서 이미지 파일을 수정할 때 파일 크기 초과 에러 발생.

로컬 개발 환경에서는 이상이 없었지만 AWS Elastic Beanstalk 으로 배포한 환경에서 파일 크기를 초과했다는 에러가 발생했습니다. 로그 에서 확인한 에러 내용은 다음과 같았습니다.
<br>

`[error] 32211#32211: *9131 client intended to send too large body: 6115831 bytes`

클라이언트에서 서버로 데이터 전송 중 body의 크기가 너무 크다는 내용이였고, 이는 Elastic Beanstalk의 기본 프록시 설정인 NGINX에 요청된 데이터의 크기가 크면 발생하는 에러였습니다.

EB는 NGINX를 역방향 프록시로 사용하는데, 프록시 서버는 클라이언트와 서버 사이의 중개자 역할을 하며 요청 및 응답을 처리하는데 중요한 역할을 합니다.

NGINX의 기본 설정은 클라이언트에서 넘어오는 데이터의 크기를 최대 1MB로 제한하는데, 여러장의 이미지를 전송하는데에는 더 큰 데이터크기가 필요해서 구성 파일을 수정해서 파일 크기 제한을 늘렸습니다.

```js
client_max_body_size 10M;
types_hash_max_size 4096;
```

이렇게 client_max_body_size와 types_hash_max_size를 늘려주며, 배포 환경에서의 이미지 파일 전송에 대한 이슈를 해결하였습니다.

<br>
<br>

# 🗓 일정

- 1주차

  - 아이디어 수집 및 선정

  - Kanban 작성

- 2주차

  - 클라이언트, 서버 초기 세팅 (보일러 플레이트)

  - 초기 페이지, 대쉬보드 페이지 구현

  - 설문 편집 페이지 각 섹션별 기능 구현

  - 설문에 대한 답변 시각화 페이지 구현

  - 서버 측과 클라이언트 측 API 연동

- 3주차

  - 전체적인 리팩토링 / 버그 수정

  - 리드미 작성

  - 배포

<br>
<br>

# 📝 회고록

처음부터 기획부터 개발까지 진행해본 프로젝트였습니다. 아이디어 수집 및 선정부터 굉장히 많은 우여곡절이 있었습니다. 일반적인 고민에서 나오는 모든 서비스는 이미 존재했었고, 어떤 프로젝트가 독창성 있으면서도 직접 경험해본 바에 의존해서 재미있게 프로젝트를 진행할 수 있을까 며칠을 고민하다가 **설문조사** 라는 주제를 찾게 되었었습니다.경험해 본 서비스 이기도 하고 개선점 같은 것들이 떠오르기도 했었기에 해당 주제로 프로젝트를 진행했습니다.

프로젝트 관리 방법부터 해서 처음부터 혼자 해내야 하다 보니 관리 방법론 부터 이해해야 했었고 여러 방법들을 찾아본 결과 워터폴, 스크럼, 칸반 등의 관리 방법론등이 있었습니다. 애자일 방법론 중 하나인 칸반 방식으로 프로젝트 작업흐름을 관리하기로 결정하고 할 일, 진행 중, 검토 중, 완료의 열로 구성해서 하나하나 세세하게 체계적으로 작업들을 관리했습니다. 이렇게 작업들을 관리하다보니 해야할 일 들이 눈에 쉽게 보였고, 작업을 하다 막힐때면 다시 칸반보드로 돌아와 확인하면서 체계적으로 생각이 정리되며 문제가 해결됐던 상황도 있었습니다.

그리고 모든 기술적인 챌린지들은 사용자에게 귀결 된다는 생각이 들었습니다. 사용자에게 서비스를 제공하는 것이 목표였기 때문에 사용자가 불편을 느끼면 그 문제들을 개선하기 위해 기술적으로 접근하고 해결하는 작업의 반복이라는 생각도 들었습니다. 이런 작업들을 효율적으로 빠르게 하기 위해선 많은 경험이 필요하다고 느꼈고 앞으로도 문제해결에 대한 경험을 쌓기 위해 끊임없이 노력해야한다고 느낀 좋은 기회였습니다.
