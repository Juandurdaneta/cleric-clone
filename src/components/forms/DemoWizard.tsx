import { useState } from 'react';

const WEBHOOK_URL = 'https://webhook.site/d2339015-82cf-4b20-bba3-ea04587613e6';

// Integration icons as inline SVGs
const SlackIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#E01E5A"/>
  </svg>
);

const TeamsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20.625 9.375h-4.5v6.75h3.375a1.125 1.125 0 0 0 1.125-1.125v-5.625z" fill="#5059C9"/>
    <path d="M18.75 6.75a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5z" fill="#5059C9"/>
    <path d="M13.5 6.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" fill="#7B83EB"/>
    <path d="M17.25 8.25H9.375a1.125 1.125 0 0 0-1.125 1.125v7.5a4.125 4.125 0 0 0 8.25 0v-7.5a1.125 1.125 0 0 0-.75-1.061V8.25h1.5z" fill="#7B83EB"/>
    <path d="M12.375 21.75a4.125 4.125 0 0 1-4.125-4.125v-6.75H3.375A1.125 1.125 0 0 0 2.25 12v5.625A4.125 4.125 0 0 0 6.375 21.75h6z" fill="#5059C9"/>
  </svg>
);

const DatadogIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.5 14.5c-.5.5-1.5.5-2.5 0l-2-2-2 2c-1 .5-2 .5-2.5 0s-.5-1.5 0-2.5l2-2-2-2c-.5-1-.5-2 0-2.5s1.5-.5 2.5 0l2 2 2-2c1-.5 2-.5 2.5 0s.5 1.5 0 2.5l-2 2 2 2c.5 1 .5 2 0 2.5z" fill="#632CA6"/>
  </svg>
);

const LokiIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#F8B500" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const ElasticsearchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13.394 12c0 .78-.632 1.413-1.413 1.413H3.787A1.413 1.413 0 0 1 2.374 12c0-.78.632-1.412 1.413-1.412h8.194c.78 0 1.413.632 1.413 1.412z" fill="#FEC514"/>
    <path d="M21.626 12a9.626 9.626 0 0 1-9.626 9.626A9.58 9.58 0 0 1 5.172 19h8.037a3.002 3.002 0 0 0 3.003-3.003v-.003H21.4a9.546 9.546 0 0 1 .226 1.996V12z" fill="#00BFB3"/>
    <path d="M16.212 8.003H5.172A9.58 9.58 0 0 1 12 2.374 9.626 9.626 0 0 1 21.626 12c0 .685-.078 1.358-.226 2.003h-5.188a3.002 3.002 0 0 0-3.003-3.003h-8.037A9.54 9.54 0 0 1 12 2.374c3.02 0 5.75 1.39 7.525 3.566.318.39.607.802.868 1.233a9.51 9.51 0 0 1 1.007 2.83h-5.188z" fill="#F04E98"/>
  </svg>
);

const CloudWatchIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" fill="#FF9900"/>
  </svg>
);

const GCPLoggingIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#4285F4"/>
    <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#669DF6"/>
    <path d="M12 12L2 7v10l10 5V12z" fill="#AECBFA"/>
  </svg>
);

const SplunkIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="#65A637"/>
    <path d="M12 6v6l5 3" stroke="#65A637" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const KubernetesIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#326CE5"/>
    <path d="M12 7v10M7 9.5l10 5M17 9.5l-10 5" stroke="white" strokeWidth="1.5"/>
  </svg>
);

const AWSIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M6.763 10.036c0 .296.032.535.088.71.064.176.144.368.256.576.04.063.056.127.056.183 0 .08-.048.16-.152.24l-.503.335a.383.383 0 0 1-.208.072c-.08 0-.16-.04-.239-.112a2.47 2.47 0 0 1-.287-.375 6.18 6.18 0 0 1-.248-.471c-.622.734-1.405 1.101-2.347 1.101-.67 0-1.205-.191-1.596-.574-.391-.384-.59-.896-.59-1.533 0-.678.239-1.23.726-1.644.487-.415 1.133-.623 1.955-.623.272 0 .551.024.846.064.296.04.6.104.918.176v-.583c0-.607-.127-1.03-.375-1.277-.255-.248-.686-.367-1.3-.367-.28 0-.567.032-.863.104a6.37 6.37 0 0 0-.863.279 2.29 2.29 0 0 1-.28.104.488.488 0 0 1-.127.023c-.112 0-.168-.08-.168-.247v-.391c0-.128.016-.224.056-.28a.597.597 0 0 1 .224-.167 4.648 4.648 0 0 1 1.005-.36 4.945 4.945 0 0 1 1.246-.151c.95 0 1.644.216 2.091.647.439.43.662 1.085.662 1.963v2.586h.016z" fill="#252F3E"/>
    <path d="M3.308 12.612c.263 0 .535-.048.822-.143.287-.096.542-.271.758-.51a1.2 1.2 0 0 0 .32-.527c.055-.191.087-.423.087-.695v-.335a6.66 6.66 0 0 0-.735-.136 6.02 6.02 0 0 0-.75-.048c-.535 0-.926.104-1.19.32-.263.215-.39.518-.39.917 0 .375.095.655.295.846.191.2.47.296.783.311z" fill="#252F3E"/>
  </svg>
);

const GCPIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12.19 5.94L14.55 2H9.45L7.09 5.94h5.1z" fill="#EA4335"/>
    <path d="M21.12 8.37l-2.36-3.94h-5.1l2.36 3.94h5.1z" fill="#4285F4"/>
    <path d="M21.12 8.37l-2.36 3.94-2.74-4.57 2.36-3.94 2.74 4.57z" fill="#34A853"/>
    <path d="M7.09 5.94L4.73 9.88h5.1l2.36-3.94h-5.1z" fill="#FBBC05"/>
    <path d="M7.09 5.94L4.35 1.37 2 5.31l2.73 4.57 2.36-3.94z" fill="#EA4335"/>
    <path d="M2 5.31L4.73 9.88l2.36-3.94L4.35 1.37 2 5.31z" fill="#34A853"/>
  </svg>
);

const AzureIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M13.05 4.24L6.56 18.05l8.49-.01-2-3.44L13.05 4.24z" fill="#0089D6"/>
    <path d="M13.05 4.24l-5.11 9.42 4.77 4.39h6.89l-6.55-13.81z" fill="#0089D6"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" fill="#1B1F23"/>
  </svg>
);

const GitLabIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M12 21.35l3.58-11.02h-7.16L12 21.35z" fill="#E24329"/>
    <path d="M12 21.35l-3.58-11.02H2.21L12 21.35z" fill="#FC6D26"/>
    <path d="M2.21 10.33l-1.9 5.85a.73.73 0 0 0 .27.82L12 21.35 2.21 10.33z" fill="#FCA326"/>
    <path d="M2.21 10.33h6.21L5.75 2.89a.36.36 0 0 0-.69 0L2.21 10.33z" fill="#E24329"/>
    <path d="M12 21.35l3.58-11.02h6.21L12 21.35z" fill="#FC6D26"/>
    <path d="M21.79 10.33l1.9 5.85a.73.73 0 0 1-.27.82L12 21.35l9.79-11.02z" fill="#FCA326"/>
    <path d="M21.79 10.33h-6.21l2.67-7.44a.36.36 0 0 1 .69 0l2.85 7.44z" fill="#E24329"/>
  </svg>
);

// Integration logos for right panel
const IntegrationLogos = () => (
  <div className="grid grid-cols-4 gap-x-8 gap-y-4">
    <img src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg" alt="Slack" className="h-8 object-contain filter brightness-0 invert" />
    <img src="https://imgix.datadoghq.com/img/dd_logo_n_70x75.png" alt="Datadog" className="h-8 object-contain filter brightness-0 invert" />
    <img src="https://grafana.com/static/img/menu/grafana2.svg" alt="Grafana" className="h-8 object-contain filter brightness-0 invert" />
    <img src="https://images.contentstack.io/v3/assets/bltefdd0b53724fa2ce/blt5d10f3a91df97d15/620a9ac8849cd422f315b83d/logo-elastic-vertical-reverse.svg" alt="Elasticsearch" className="h-8 object-contain filter brightness-0 invert" />
    <img src="https://kubernetes.io/images/favicon.png" alt="Kubernetes" className="h-8 object-contain filter brightness-0 invert" />
    <span className="text-white font-bold text-xl">aws</span>
    <span className="text-white text-sm">Google Cloud</span>
    <span className="text-white text-sm flex items-center gap-1"><span className="text-blue-400">▲</span> Azure</span>
    <span className="text-white font-bold text-2xl">GitHub</span>
    <span className="text-white text-sm flex items-center gap-1"><span className="text-green-400">●</span> Prometheus</span>
    <span className="text-white font-bold">PagerDuty</span>
    <span className="text-white text-sm">✱ Confluence</span>
  </div>
);

interface StackOption {
  id: string;
  name: string;
  icon: React.ReactNode;
  comingSoon?: boolean;
}

const communicationOptions: StackOption[] = [
  { id: 'slack', name: 'Slack', icon: <SlackIcon /> },
  { id: 'teams', name: 'Teams', icon: <TeamsIcon />, comingSoon: true },
];

const logsOptions: StackOption[] = [
  { id: 'datadog', name: 'Datadog', icon: <DatadogIcon /> },
  { id: 'loki', name: 'Loki', icon: <LokiIcon /> },
  { id: 'elasticsearch', name: 'Elasticsearch', icon: <ElasticsearchIcon /> },
  { id: 'cloudwatch', name: 'CloudWatch', icon: <CloudWatchIcon /> },
  { id: 'gcp-logging', name: 'GCP Logging', icon: <GCPLoggingIcon /> },
  { id: 'splunk', name: 'Splunk', icon: <SplunkIcon />, comingSoon: true },
];

const infrastructureOptions: StackOption[] = [
  { id: 'kubernetes', name: 'Kubernetes', icon: <KubernetesIcon /> },
  { id: 'aws', name: 'Amazon Web Services', icon: <AWSIcon /> },
  { id: 'gcp', name: 'Google Cloud Platform', icon: <GCPIcon /> },
  { id: 'azure', name: 'Azure', icon: <AzureIcon /> },
];

const sourceCodeOptions: StackOption[] = [
  { id: 'github', name: 'GitHub', icon: <GitHubIcon /> },
  { id: 'gitlab', name: 'GitLab', icon: <GitLabIcon />, comingSoon: true },
];

const problemOptions = [
  'Too many alerts / noisy alerts',
  'Slow RCA process',
  'Cross-team incidents',
  'We use coding agents and want to explore an SRE agent',
  'Other',
];

export default function DemoWizard() {
  const [step, setStep] = useState(1);
  const [selectedCommunication, setSelectedCommunication] = useState<string>('');
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [selectedInfra, setSelectedInfra] = useState<string[]>([]);
  const [selectedSourceCode, setSelectedSourceCode] = useState<string[]>([]);

  // Step 2 form data
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [problems, setProblems] = useState<string[]>([]);
  const [notes, setNotes] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const totalEnabled = (selectedCommunication ? 1 : 0) + selectedLogs.length + selectedInfra.length + selectedSourceCode.length;
  const canProceed = totalEnabled >= 5;

  const toggleSelection = (id: string, selected: string[], setSelected: (val: string[]) => void) => {
    if (selected.includes(id)) {
      setSelected(selected.filter(s => s !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  const toggleProblem = (problem: string) => {
    if (problems.includes(problem)) {
      setProblems(problems.filter(p => p !== problem));
    } else {
      setProblems([...problems, problem]);
    }
  };

  const handleNext = () => {
    if (canProceed) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');

    const formData = {
      // Step 1 data
      communication: selectedCommunication,
      logs: selectedLogs,
      infrastructure: selectedInfra,
      sourceCode: selectedSourceCode,
      // Step 2 data
      name,
      email,
      problems,
      notes,
      acceptTerms,
      // Metadata
      submittedAt: new Date().toISOString(),
    };

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setSubmitSuccess(true);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const OptionButton = ({
    option,
    selected,
    onClick,
    radio = false
  }: {
    option: StackOption;
    selected: boolean;
    onClick: () => void;
    radio?: boolean;
  }) => (
    <button
      type="button"
      onClick={option.comingSoon ? undefined : onClick}
      disabled={option.comingSoon}
      className={`flex items-center gap-3 px-4 py-3 border rounded-lg transition-all w-full text-left ${
        option.comingSoon
          ? 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-60'
          : selected
            ? 'border-primary bg-primary/5'
            : 'border-gray-200 hover:border-gray-300 bg-white'
      }`}
    >
      <span className="flex-shrink-0">{option.icon}</span>
      <span className="text-dark font-medium">{option.name}</span>
      {option.comingSoon && (
        <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Coming soon</span>
      )}
    </button>
  );

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Form */}
      <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
        <div className="max-w-[560px] mx-auto px-6 py-8 lg:px-12 lg:py-12">
          {step === 1 ? (
            <>
              {/* Logo */}
              <div className="mb-8">
                <a href="/" className="text-2xl font-gt-alpina text-dark">Cleric</a>
              </div>

              {/* Header */}
              <h1 className="text-[32px] font-gt-alpina text-dark mb-3">Select your stack</h1>
              <p className="text-body mb-8">
                Select your stack to see if Cleric is a fit. If it is, get 4 weeks free.
              </p>

              {/* Communication */}
              <div className="mb-8">
                <label className="block text-dark font-medium mb-3">
                  Communication <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {communicationOptions.map(option => (
                    <OptionButton
                      key={option.id}
                      option={option}
                      selected={selectedCommunication === option.id}
                      onClick={() => setSelectedCommunication(option.id)}
                      radio
                    />
                  ))}
                </div>
              </div>

              {/* Logs */}
              <div className="mb-8">
                <label className="block text-dark font-medium mb-3">
                  Logs (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {logsOptions.map(option => (
                    <OptionButton
                      key={option.id}
                      option={option}
                      selected={selectedLogs.includes(option.id)}
                      onClick={() => toggleSelection(option.id, selectedLogs, setSelectedLogs)}
                    />
                  ))}
                </div>
              </div>

              {/* Infrastructure */}
              <div className="mb-8">
                <label className="block text-dark font-medium mb-3">
                  Infrastructure (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {infrastructureOptions.map(option => (
                    <OptionButton
                      key={option.id}
                      option={option}
                      selected={selectedInfra.includes(option.id)}
                      onClick={() => toggleSelection(option.id, selectedInfra, setSelectedInfra)}
                    />
                  ))}
                </div>
              </div>

              {/* Source Code */}
              <div className="mb-8">
                <label className="block text-dark font-medium mb-3">
                  Source Code (select all that apply)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {sourceCodeOptions.map(option => (
                    <OptionButton
                      key={option.id}
                      option={option}
                      selected={selectedSourceCode.includes(option.id)}
                      onClick={() => toggleSelection(option.id, selectedSourceCode, setSelectedSourceCode)}
                    />
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeLinecap="round" strokeWidth="2" d="M12 8v4M12 16h.01" />
                  </svg>
                  <span>Select your stack | {totalEnabled}/5 enabled</span>
                </div>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!canProceed}
                  className="text-sm text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  See what Cleric can do for you
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Back button */}
              <button
                type="button"
                onClick={handleBack}
                className="flex items-center gap-2 text-dark hover:text-gray-600 mb-8"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>

              {/* Header */}
              <h1 className="text-[32px] font-gt-alpina text-dark mb-3">Connect with the Cleric team</h1>
              <p className="text-body mb-8">
                A Cleric engineer will set up your dedicated instance (ready in ~24 hours). Book a call to discuss your setup and get started.
              </p>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="mb-6">
                  <label className="block text-dark font-medium mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                {/* Email */}
                <div className="mb-6">
                  <label className="block text-dark font-medium mb-2">
                    Work email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary"
                    required
                  />
                </div>

                {/* Problems */}
                <div className="mb-6">
                  <label className="block text-dark font-medium mb-3">
                    What are you looking to solve? <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {problemOptions.map(problem => (
                      <label key={problem} className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={problems.includes(problem)}
                          onChange={() => toggleProblem(problem)}
                          className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                        />
                        <span className="text-dark">{problem}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="mb-6">
                  <label className="block text-dark font-medium mb-2">
                    Anything else about your setup we should know?
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Optional - e.g., 'We use custom auth for K8s'"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:border-primary resize-none"
                  />
                </div>

                {/* Terms */}
                <div className="mb-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="w-4 h-4 border-gray-300 rounded text-primary focus:ring-primary"
                      required
                    />
                    <span className="text-dark">
                      I accept the{' '}
                      <a href="/terms" className="underline hover:text-primary" target="_blank" rel="noopener noreferrer">
                        Terms & Conditions
                      </a>
                      {' '}
                      <svg className="inline w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </label>
                </div>

                {/* Error message */}
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}

                {/* Success message */}
                {submitSuccess ? (
                  <div className="text-center py-8">
                    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-gt-alpina text-dark mb-2">Thank you!</h3>
                    <p className="text-body mb-4">We'll be in touch shortly to schedule your call.</p>
                    <a href="/" className="text-primary hover:underline">Return to homepage</a>
                  </div>
                ) : (
                  /* Submit */
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-dark text-white font-medium rounded-lg hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Book a call'
                    )}
                  </button>
                )}
              </form>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Background */}
      <div
        className="hidden lg:block lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/images/hero_bg.png')" }}
      >
        {/* Overlay card */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 bg-white rounded-xl p-6 shadow-lg max-w-md">
          {step === 1 ? (
            <>
              <div className="text-xs text-muted uppercase tracking-wide mb-2">ASSESSMENT</div>
              <h3 className="text-xl font-gt-alpina text-dark mb-1">Select your stack</h3>
              <p className="text-sm text-muted">See what Cleric can do for you</p>
            </>
          ) : (
            <>
              <p className="text-dark mb-4 leading-relaxed">
                "I see Cleric functioning as an SRE companion available for our Software Engineers. An SRE in my team should maintain a global view across all engineering teams. This means if one team has already solved an alert, we can apply that knowledge elsewhere."
              </p>
              <div className="flex items-center gap-3">
                <img
                  src="/images/homepage/section/maxime 1.png"
                  alt="Maxime Fouilleul"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-medium text-dark">Maxime Fouilleul</div>
                  <div className="text-sm text-muted">Head of Infrastructure & Operations at BlaBlaCar</div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Integrations */}
        <div className="absolute bottom-16 left-0 right-0 px-8">
          <div className="text-center mb-6">
            <span className="text-white/60 text-xs uppercase tracking-widest">INTEGRATIONS</span>
          </div>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-white opacity-80">
            <span className="font-semibold text-lg">slack</span>
            <span className="font-semibold">DATADOG</span>
            <span className="font-semibold">Grafana</span>
            <span className="font-semibold">elasticsearch</span>
            <span className="font-semibold">kubernetes</span>
            <span className="font-bold">aws</span>
            <span>Google Cloud</span>
            <span>Azure</span>
            <span className="font-bold text-xl">GitHub</span>
            <span>Prometheus</span>
            <span className="font-bold">PagerDuty</span>
            <span>Confluence</span>
          </div>
        </div>
      </div>
    </div>
  );
}
