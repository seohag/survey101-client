# 📊 Survey101

![logo]()

설문 양식을 직접 커스터마이징 하여 링크를 통해 공유하고, 응답 받은 설문 결과 시각화를 도와주는 웹서비스 입니다.

<br>
<br>

# 🔗 Links

[Frontend Repo](https://github.com/seohag/survey101-client) | [Backend Repo](https://github.com/seohag/survey101-server) | [Deployed web](https://web.survey101.site/)

<br>
<br>

# 🖥️ Preview

<br>
<br>

# 📖 Contents

- [Motivation](#👀-motivation)
- [Tech Stack](#🔨-tech-stack)
  - [FormData](#왜-formdata를-사용해서-작업했을까)
  - [React Query / Zustand](#react-query-그리고-zustand는-왜-사용했을까)
- [Technial Challenges](#🏔-technical-challenges)
  - [컴포넌트 모듈화](#컴포넌트-모듈화-재사용성-유연성-향상-유지보수성-향상-컴포넌트-관심사-분리-추상화)
  - [설문 데이터의 구조는 어떻게 설계했을까?](#설문-데이터의-구조는-어떻게-설계했을까-데이터-스키마-모델링)
  - [클라이언트와 서버와의 API 통신간 예상치 못한 에러는 어떻게 핸들링 했을까?](#클라이언트와-서버와의-api-통신간-예상치-못한-에러는-어떻게-핸들링-했을까)
  - [AWS S3 이미지 업로드 에러가 발생했을 때의 에러는 어떻게 핸들링 했을까?](#aws-s3-bucket으로-이미지가-업로드-되는-과정에서-업로드-되지-않으면-어떻게-에러처리-했을까)
  - [유저 경험과 인터페이스는 어떤 부분을 신경썼을까?](#유저-경험과-인터페이스는-어떤-부분을-신경썼을까)
- [Schedule](#🗓-schedule)
- [Memoir](#📝-memoir)

<br>
<br>

# 👀 Motivation

설문조사 양식을 만드는데 있어서 정형화 되어있는 설문 조사 양식을 어떻게 하면 "사용자가 설문 폼 양식을 보기좋게 입맛대로 커스터마이징 할 수 있을까?" 라는 고민으로 시작해, "응답 받는 데이터 까지도 시각화" 할 수 있다면 괜찮은 설문조사 웹 서비스가 되지 않을까 라는 답변을 내며 "Survey101" 프로젝트를 진행 해보았습니다.

사용자들이 보다 직관적이고 맞춤형 설문조사를 만들 수 있도록 도와주는 것에 초점을 맞추었으며, 사용자들이 간단하고 쉽게 설문 양식을 디자인 할수 있는 기능을 제공하고, 다양한 목적에 맞춘 설문을 작성할 수 있도록 서비스를 제공하고 싶었습니다.

또한 수집한 데이터를 시각화하여 제공함으로써, 응답 결과를 더욱 쉽게 이해하고 분석할 수 있도록 도와주며, 이를 통해 데이터 분석에 소요되는 시간과 노력을 절약하면서 보다 의미 있는 인사이트를 얻을 수 있으면 했습니다.

이와 같은 기능들을 통해, 설문조사에 대한 접근성과 유연성을 높여 사용자들이 보다 효율적으로 정보를 수집하고 활용할 수 있도록 지원하는 것을 목표로 하는 웹서비스 입니다.

<br>
<br>

# 🔨 Tech Stack

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

### 왜 FormData를 사용해서 작업했을까?

웹에서의 폼은 사용자와 웹사이트 또는 애플리케이션 간의 주요 상호작용 지점 중 하나입니다. 폼을 통해 데이터를 입력 받고, 처리 및 저장을 위해 백엔드 서버로 전송됩니다.

폼에는 굉장히 많은 타입의 정보들을 입력하고 저장할 수 있습니다. 장점이기도 하지만, 너무 많은 데이터를 담을 수 있기에 조심스럽게 다뤄야 한다는 점을 알게 되었습니다.

폼을 변조해 서버의 엔드 포인트로 특이한 요청을 보내는 등의 보안 공격을 할 수 있기도 하기에, 올바른 타입에 올바른 데이터, 그리고 사용자의 데이터를 보호하기 위해 폼 유효성 검사가 굉장히 중요하다는 것을 알게 되었습니다.

Survey101에서는 HTML5의 Form 대신 FormData 라는 Web API를 사용했습니다.

FormData를 사용한 가장 근본적인 이유는 웹 애플리케이션에서 파일이나 이미지와 같은 바이너리 데이터를 서버로 전송하기 위한 표준 방법 중 하나인데, FormData는 HTML `<form>` 요소를 통해 생성된 데이터를 인코딩하는 방법 중 하나이며, 이를 통해 파일이나 이미지 데이터를 텍스트와 동시에 전송할 수 있기 때문에 사용했습니다.

FormData는 HTML이 아니고 JS 단에서 폼데이터를 다루는 객체이며 이미지와 같은 멀티미디어 파일들을 페이지 전환 없이 비동기로 제출하고 싶을 때나 JS로 좀 더 타이트하게 데이터를 관리할 때 폼데이터를 사용하기도 합니다. 그렇기에 FormData를 사용해서 작업하였습니다.

<br>

### React Query 그리고 Zustand는 왜 사용했을까?

설문을 커스터마이징 하고, 커스터마이징한 설문을 공유해서 응답을 받는 작업들을 하다보면, 클라이언트와 서버와의 상호작용이 굉장히 많습니다. 서버에서 넘어온 정보를 그대로 저장해서 사용한다면 복잡한 상황이 나올 수 있는 상황이 나오기 때문에 분리해서 상태관리를 하였습니다.

Zustand는 구독 발행 기반이며, 스토어의 상태 변경이 일어날 때 리스너 함수를 모았다가 상태가 변경되면 그때 리스너들에게 상태가 변경되었다고 알려줍니다. 상태의 변경,조회,구독 등을 통해서만 스토어를 다루고, 실제 상태는 컴포넌트 생명주기 내에 의도지 않게 변경되는 것을 막아줍니다.

대신 구조분해 할당으로 상태값만 받아와서 사용하면 store를 구독하고 있는 컴포넌트 들은 모두 리렌더링이 발생하기 때문에 selector 함수를 사용해서 필요한 상태만 선택적으로 가져오며 불필요한 렌더링을 방지하였습니다.

selector 함수로 가져온 상태는 store에 중앙집권화 되어있는 상태와 독립적으로 관리되기 때문에 컴포넌트가 필요한 상태에 집중할 수 있고, 상태의 변경에 따라 필요한 부분만 업데이트 되는 이유와,

별도의 리듀서, 액션, 미들웨어 없이 상태관리가 가능하고, 컴포넌트 간 상태 공유를 용이하게 해주는 장점이 있어 zustand를 사용하였습니다.

<br>
<br>

# 🏔 Technical Challenges

### 컴포넌트 모듈화 (재사용성, 유연성 향상, 유지보수성 향상, 컴포넌트 관심사 분리, 추상화)

- ...

### 설문 데이터의 구조는 어떻게 설계했을까?

Survey101의 데이터 스키마 및 모델링은, User라는 entity를 시작으로 Survey 그리고 Question, options, answers 순으로 중첩 되어있는 구조 입니다.

설문조사 관리 웹서비스 특성 상 설문을 커스터마이징 해서 공유한다는 성격을 가지고 있기 때문에 한명의 유저가 여러개의 설문 양식을 만들고, 만든 설문 양식들을 관리하는 방식이기 때문에 Survey와 User은 1 대 다 관계로 설정하였습니다.

데이터 구조 모델은 reference 방식과 embedding 방식 중 embedding 방식으로 선택하였습니다.

선택한 embedding 방식은 하나의 요청으로 하나의 문서에 관련된 데이터에 모두 접근할 수 있으며, embedding 모델을 사용하면 애플리케이션이 동일한 데이터베이스 관련 정보를 쿼리할 수 있고, 필요한 쿼리 및 업데이트 횟수를 줄일 수 있습니다.

이러한 장점들을 갖고 있지만 너무 많이 중첩되는 형태가 될 수 있고, 용량 크기 제한이 있긴 합니다.

반대로 Reference 방식은 데이터 간의 관계를 저장합니다. 데이터가 여러 컬렉션으로 나뉘고 중첩되지 않기 때문에 정규화 되어 있고 유연합니다.

대신 한번의 쿼리로 모든 데이터를 읽어오지 못하기 때문에 읽는 속도는 embedding 방식보단 느리고, 연결된 데이터가 바뀔 때 일관성 유지가 어렵습니다.

이런 차이점을 가지고 있는 부분을 학습하여 데이터 구조를 선택하고, Embedding 방식으로 진행하였습니다.

데이터 구조를 설계하고나서 프로젝트를 진행 하던 중 여러 난관이 있었지만 이 부분이 가장 기억에 남았던 부분이였던 것 같습니다.

중첩 되어있는 데이터들을 다루며 그 데이터들을 데이터베이스에 CRUD 하는 일련의 과정들을 직접 해보며 많은 공부가 되었습니다.

<br>

### 클라이언트와 서버와의 API 통신간 예상치 못한 에러는 어떻게 핸들링 했을까 ?

- ...

### AWS S3 Bucket으로 이미지가 업로드 되는 과정에서 업로드 되지 않으면 어떻게 에러처리 했을까?

- ...

### 유저 경험과 인터페이스는 어떤 부분을 신경썼을까?

- ...

<br>
<br>

# 🗓 Schedule

- 1주차

  - 아이디어 수집 선정

  - Kanban 작성

- 2주차

  - 클라이언트 측 설문조사 기능 구현

  - 서버 측 설문조사 기능 구현 후 클라이언트와 API 연동

- 3주차

  - 전체적인 리팩토링 / 버그 수정

  - 리드미 작성

  - 배포

<br>
<br>

# 📝 Memoir
