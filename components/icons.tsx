import React from 'react';

export const DollarSignIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8v1m0 6v1m0-10a9 9 0 110 18 9 9 0 010-18z" />
  </svg>
);

export const ZapIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

export const FilterIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L16 11.414V16a1 1 0 01-.293.707l-2 2A1 1 0 0113 18v-6.586l-3.707-3.707A1 1 0 019 7V4a1 1 0 01-1-1H4a1 1 0 01-1-1z" />
  </svg>
);

export const WhopIcon: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16.14 9.4L12 12L7.86 9.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

// FIX: Export the DiscordIcon component and fix corrupted SVG path data.
export const DiscordIcon: React.FC<{ className?: string }> = ({ className = "h-10 w-10 text-[#5865f2]" }) => (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M20.317 4.3698a19.7913 19.7913 0 0 0-4.8852-1.5152.0741.0741 0 0 0-.0785.0371c-.211.3753-.4464.8143-.6667 1.2882-1.8845-.3334-3.882-.3334-5.7665 0-.2203-.474-.4558-.9129-.6667-1.2882a.077.077 0 0 0-.0785-.037c-1.721-.43-3.3522-1.006-4.8852-1.5152a.0694.0694 0 0 0-.0823.0834c-.4795 1.841.0117 3.65.6427 5.2759a16.9427 16.9427 0 0 0-1.6248 3.0918.077.077 0 0 0 .0117.0917c.3582.2514.7344.4719 1.121.6562a.077.077 0 0 0 .0934-.0117c.3333-.2933.6427-.6139.9215-.9517a11.6113 11.6113 0 0 0-1.521 1.4878.077.077 0 0 0 .0118.1097c.7122.5028 1.4938.9132 2.3234 1.225a.077.077 0 0 0 .0973-.043c.24-1.2882.3333-2.5881.3333-3.8996a.077.077 0 0 0-.0118-.0637c-.3215-.22-.6003-.4557-.8473-.6914a.077.077 0 0 0-.0973-.0118c-1.2585.586-2.6972.986-4.22.986a.077.077 0 0 0-.0666.075c-.0117.22-.0235.43-.0235.6562a12.155 12.155 0 0 0 2.227 6.4179.077.077 0 0 0 .0934.043c.59-.2008 1.14-.4213 1.6248-.6775a.077.077 0 0 0 .047-.0975c-.211-.33-.3993-.6775-.5638-1.025a.077.077 0 0 0-.074-.0637c-.504-.15-.9768-.3008-1.4132-.4719a.077.077 0 0 0-.0823.043c-.631 1.32-.48 2.721.22 3.961a.077.077 0 0 0 .0934.043c2.0125-.714 3.6393-1.782 4.8852-3.159a12.8683 12.8683 0 0 0 2.0594 1.6379.077.077 0 0 0 .0973.004c.48-.2514.9215-.5232 1.32-.8143a.077.077 0 0 0 .0546-.0936c-.1645-.3494-.3528-.697-.5638-1.025a.077.077 0 0 0-.074-.0637c-.4375.171-.91.321-1.4132.4719a.077.077 0 0 0-.0823.043c-.631 1.32-.48 2.72.22 3.961a.077.077 0 0 0 .0934.043c.9333-.33 1.7925-.742 2.56-1.2154a.077.077 0 0 0 .0586-.0975c-.074-.231-.1493-.4515-.22-.6775a.077.077 0 0 0-.0666-.0637c-.9452.171-1.89.2804-2.823.33a.077.077 0 0 0-.074.075c.0118.2804.0118.5725.0118.8644a13.336 13.336 0 0 0 3.328-2.61a.077.077 0 0 0 .0235-.0975c-.3215-.552-.6-1.125-.8233-1.711a.077.077 0 0 0-.074-.0522c-.5275.021-1.57.042-1.57.042a.077.077 0 0 0-.074.0834c.0117.21.0235.42.0235.635a.077.077 0 0 0 .074.075c.48.075.95.14 1.4132.22a.077.077 0 0 0 .0823-.0522c.2435-.586.3993-1.2.4795-1.84a.077.077 0 0 0-.0586-.0834c-1.3-.43-2.522-.763-3.6628-.975a.077.077 0 0 0-.0823.037c-.211.3753-.422.763-.61 1.15a13.298 13.298 0 0 0-3.328-1.025a.077.077 0 0 0-.0586.004c-1.442.53-2.823.885-4.145.986a.077.077 0 0 0-.0666.075c-.0117.22-.0235.43-.0235.6562a12.155 12.155 0 0 0 2.227 6.4179.077.077 0 0 0 .0934.043c.59-.2008 1.14-.4213 1.6248-.6775a.077.077 0 0 0 .047-.0975c-.211-.33-.3993-.6775-.5638-1.025a.077.077 0 0 0-.074-.0637c-.504-.15-.9768-.3008-1.4132-.4719a.077.077 0 0 0-.0823.043c-.631 1.32-.48 2.72.22 3.961a.077.077 0 0 0 .0934.043c.89.31 1.7925.56 2.6972.742a.077.077 0 0 0 .0823-.0118c.5524-.48 1.025-.99 1.4132-1.54a10.422 10.422 0 0 0 1.5445-2.022.077.077 0 0 0-.004-.0834c-.5638-.38-1.12-.76-1.654-1.15a.077.077 0 0 0-.0934-.0117c-.4375.2514-.85.5115-1.2585.76a.077.077 0 0 0-.043.0834c.1882.68.3215 1.37.3993 2.065a.077.077 0 0 0 .074.075c.422.0118.84.0235 1.2585.0235a11.583 11.583 0 0 0 3.8233-1.006.077.077 0 0 0 .043-.075c0-.21-.0118-.42-.0235-.635a.077.077 0 0 0-.074-.075c-.5638-.08-1.11-.16-1.654-.25a.077.077 0 0 0-.0823.0522c-.27.7-.4558 1.41-.5638 2.12a.077.077 0 0 0 .0586.0834c.78.27 1.56.48 2.3234.635a.077.077 0 0 0 .0823-.043c.27-.586.48-1.196.63-1.82a.077.077 0 0 0-.0235-.0834c-.586-.33-1.14-.68-1.654-1.025a.077.077 0 0 0-.0934-.004c-1.34.99-2.78 1.6-4.25 1.84a.077.077 0 0 0-.0586.075c.011" /></svg>
);

// FIX: Export the LogoutIcon component.
export const LogoutIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

// FIX: Export the CheckIcon component.
export const CheckIcon: React.FC<{className?: string}> = ({className = "h-6 w-6"}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

// FIX: Export the ZapierIcon component.
export const ZapierIcon: React.FC<{ className?: string }> = ({ className = "h-10 w-10" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.5 13.5H9V18L15 11H9.5L12 4.5H4.5V13.5Z" fill="#ff4a00"/>
    </svg>
);

// FIX: Export the SettingsIcon component.
export const SettingsIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

// FIX: Export the CreditCardIcon component.
export const CreditCardIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
  </svg>
);

// FIX: Export the ArrowUpIcon component.
export const ArrowUpIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
  </svg>
);

// FIX: Export the BarChartIcon component.
export const BarChartIcon: React.FC<{className?: string}> = ({className = "h-5 w-5"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// FIX: Export the ShieldCheckIcon component.
export const ShieldCheckIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.955a11.955 11.955 0 0018 0c0-4.007-1.42-7.747-3.618-10.016z" />
  </svg>
);

// FIX: Export the LinkIcon component.
export const LinkIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

// FIX: Export the ArrowLeftIcon component.
export const ArrowLeftIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
  </svg>
);

// FIX: Export the ExternalLinkIcon component.
export const ExternalLinkIcon: React.FC<{className?: string}> = ({className = "h-4 w-4"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
  </svg>
);

// FIX: Export the EyeIcon component.
export const EyeIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

// FIX: Export the TrashIcon component.
export const TrashIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);

// FIX: Export the XIcon component.
export const XIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// FIX: Export the SearchIcon component.
export const SearchIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

export const CornerDownRightIcon: React.FC<{className?: string}> = ({className = "h-4 w-4"}) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 10 20 15 15 20"></polyline>
    <path d="M4 4v7a4 4 0 0 0 4 4h12"></path>
  </svg>
);