## 📢 프로젝트 소개

Pick n Click (픽앤클릭)은 네이버 스토어를 차용한 쇼핑몰 웹애플리케이션으로 구매는 물론 누구나 판매자가 될 수 있습니다.<br />
마이페이지에서 ‘스토어 등록’ 버튼 을 누르면 바로 스토어 등록이 되며 ‘주문 관리’ 페이지를 통해 상품 등록을 할 수 있습니다. 주문 현황에 따라 재고, 판매 상태 등이 관리됩니다.<br />
또한, 판매자라 하여도 주문 관리 페이지에서 벗어나면 구매자가 되어 원하는 상품을 장바구니에 담고 주문하는 등에 일반 소비자로써 웹 페이지를 이용 할 수 있습니다.
<br />

## 📍 배포 링크

[https://picknclick-beta.vercel.app/](https://picknclick-beta.vercel.app/)

<br />

## 📅 프로젝트 기간

- **2025.03.20 ~ 2025.03.27**

<br />

## [프로젝트 계기]

- 단순 구매뿐 아니라 누구나 판매자로 쉽게 전환할 수 있는 웹애플리케이션을 만들어 창업이나 부업에 대한 접근성을 높이고자 했습니다.
- 마이페이지 내 '스토어 등록' 버튼 하나로 즉시 스토어 개설이 가능하도록 하여 복잡한 절차 없이 누구나 상점을 운영할 수 있는 환경을 제공하고자 하였습니다.
- 주문 관리 페이지를 통해 실시간으로 주문 현황과 재고, 판매 상태를 관리하여 판매자가 직관적으로 상품을 운영할 수 있는 환경을 만들고자 하였습니다.
- 판매자라도 페이지 이동과 동시에 일반 소비자로 전환되어 원하는 상품을 구매할 수 있는 유연한 구조를 만들고자 하였습니다.
  <br />

## 💏멤버 소개

<table>
  <tbody>
    <tr>
      <td width="300px" align="center">
        <a href="https://github.com/33hyun">
        <img src="https://avatars.githubusercontent.com/u/192601063?v=4" width="80" alt="Hyunbin Jang"/>
        <br />
        <sub><b>장현빈</b></sub>
        </a>
        <br />
      </td>
         <td width="300px" align="center">
        <a href="https://github.com/Eletsia">
        <img src="https://avatars.githubusercontent.com/u/166839043?v=4" width="80" alt="Jeonghyun Min"/>
        <br />
        <sub><b>민정현</b></sub>
        </a>
        <br />
      </td>
      <td width="300px" align="center">
        <a href="https://github.com/PureunKang">
        <img src="https://avatars.githubusercontent.com/u/144876018?v=4" width="80" alt="Pureun Kang"/>
        <br />
        <sub><b>강푸른</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>레이아웃, 홈화면, 디테일</b> <br/>
      </td>
      <td align="center">
        <b>DB 설계, 마이페이지</b> <br/>
      </td>
      <td align="center">
        <b>회원가입, 로그인, 홈화면</b> <br/>
      </td>
    </tr>
    <tr>
      <td align="center">
        <a href="https://github.com/sohxxny">
        <img src="https://avatars.githubusercontent.com/u/119118662?v=4" width="80" alt="Soheun Lee"/>
        <br />
        <sub><b>이소흔</b></sub>
        </a>
        <br />
      </td>
      <td align="center">
        <a href="https://github.com/UrePu">
        <img src="https://avatars.githubusercontent.com/u/85550543?v=4" width="80" alt="SeonJae Kim"/>
        <br />
        <sub><b>김선제</b></sub>
        </a>
        <br />
      </td>
    </tr>
    <tr>
      <td align="center">
        <b>장바구니 페이지, 주문 목록 관리 페이지</b> <br/>
      </td>
      <td align="center">
        <b>판매 상품 관리 페이지</b> <br/>
      </td>
      <td align="center">
    </tr>
  </tbody>
</table>

<br />

## 🛠 **기술스택**

### 📌 **프로그래밍 언어 및 프레임워크**

- **TypeScript**
- **Next.js**

### 🎨 **UI 프레임워크 및 스타일링**

- **Tailwind CSS**
- **Shadcn/ui**
- **React-icons**

### 🔍 **데이터 검증**
- **Zod:** 런타임 데이터 검증 및 TypeScript 타입 안전성 확보

### ✅ **코드 품질 및 포맷팅**

- **ESLint**
- **Prettier**

### 🗄️ **백엔드 및 데이터베이스**

- **Supabase (PostgreSQL 기반)**
  - **데이터베이스:** 사용자 정보, 상품 정보, 후기 등등 관리
  - **인증:** 사용자 로그인 및 회원가입 관리
  - **Storage:** 상품 이미지 등 파일 업로드 관리

### 🗃️ **상태 관리 및 데이터 패칭**

- **Zustand:** 클라이언트 상태 관리
- **TanStack Query:** 서버 상태 관리 및 데이터 패칭

### 🗃️ **버전 관리**

- **Git/GitHub**

### 🚀 **배포**

- **Vercel**

<br />

## 📝 **주요 기능**

### 🛒 쇼핑몰 이용

- 사용자는 홈화면을 통해 판매자가 등록한 상품의 이미지, 상품명, 가격을 파악할 수 있습니다.
- 각 상품에는 **장바구니 아이콘**이 함께 표시되어, 클릭 시 바로 장바구니에 상품이 업데이트 됩니다.
- 화면 사이드에 **최근 본 상품**이 표시되어 최근 조회한 상품을 확인 할 수 있습니다.

### 📝 리뷰 작성

- 구매한 상품의 후기를 남길 수 있어 사용자들 간 구매 경험을 나눌 수 있습니다.

### 🧑‍💻 마이페이지

- 구매한 상품과 그 상태 (주문 확인, 배송 등)를 확인할 수 있습니다.
- 본인이 작성한 후기, 후기 작성 가능한 상품을 확인 할 수 있습니다.
- 스토어 등록 버튼을 제공하여 클릭 한 번으로 스토어 등록을 마칠 수 있습니다.
- 주문 관리 버튼을 통해 판매자 페이지로 넘어갈 수 있습니다.

### 📈 주문관리

- 판매자로써 상품을 등록할 수 있습니다.
- 판매 중인 상품의 재고, 가격, 주문 상황을 실시간으로 파악할 수 있으며, 상품의 판매를 중단 할 수 있습니다.

<br />

## 📁 **프로젝트 구조**

```
├──📁api #DB로부터 데이터를 받아오는 함수 모음 
├──📁app #앱라우터 기반 페이지 라우팅
├── 📁components
│ ├── 📁cart # 장바구니 관련 컴포넌트
│ ├── 📁common # 재사용 가능한 공통 컴포넌트
│ ├── 📁detail # 상품 상세 컴포넌트
│ ├── 📁home # 홈화면 컴포넌트
│ ├── 📁layout # 헤더 등 페이지 전체 레이아웃 컴포넌트
│ ├── 📁login # 로그인 컴포넌트
│ ├── 📁mypage # 마이페이지 컴포넌트
│ ├── 📁register # 회원가입 컴포넌트
│ ├── 📁shop-manage # 주문관리 관련 컴포넌트
│ └── 📁ui # shadcn/ui 모음
├── 📁hooks # TanStack Query 관련 설정
│ ├── 📁mutations 
│ └── 📁queries
├── 📁lib # shadcn/ui 관련 폴더
├── 📁services # Supabase 클라이언트 설정 및 초기화 코드
├── 📁store # Zustand를 활용한 전역 상태 관리
├── 📁types # 타입 정의
└── 📁utils # 포맷팅 파일
```
