import { useState, useEffect, useCallback } from 'react';

interface FormData {
  email: string;
  company: string;
  role: string;
  teamSize: string;
  monitoringTools: string;
  notes: string;
}

interface FormErrors {
  email?: string;
  company?: string;
  role?: string;
  teamSize?: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const WEBHOOK_URL = 'https://webhook.site/your-webhook-id-here';

const roleOptions = [
  { value: '', label: 'Select your role' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'devops', label: 'DevOps' },
  { value: 'sre', label: 'SRE' },
  { value: 'management', label: 'Management' },
  { value: 'other', label: 'Other' },
];

const teamSizeOptions = [
  { value: '', label: 'Select team size' },
  { value: '1-10', label: '1-10' },
  { value: '11-50', label: '11-50' },
  { value: '51-200', label: '51-200' },
  { value: '200+', label: '200+' },
];

export default function TryItOutWizard() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    company: '',
    role: '',
    teamSize: '',
    monitoringTools: '',
    notes: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  // Expose open function globally
  useEffect(() => {
    (window as any).openTryItOutModal = () => setIsOpen(true);
    return () => {
      delete (window as any).openTryItOutModal;
    };
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Reset form after animation
    setTimeout(() => {
      setCurrentStep(1);
      setFormData({
        email: '',
        company: '',
        role: '',
        teamSize: '',
        monitoringTools: '',
        notes: '',
      });
      setErrors({});
      setStatus('idle');
      setErrorMessage('');
    }, 300);
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateStep1 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }

    if (!formData.role) {
      newErrors.role = 'Please select your role';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.teamSize) {
      newErrors.teamSize = 'Please select your team size';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setCurrentStep(2);
      setErrors({});
    }
  };

  const handleBack = () => {
    setCurrentStep(1);
    setErrors({});
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) {
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setStatus('success');
    } catch (error) {
      setStatus('error');
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      );
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-modal-in"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            <SuccessState onClose={handleClose} />
          ) : (
            <>
              {/* Header */}
              <div className="mb-6">
                <h2
                  id="modal-title"
                  className="text-2xl font-heading font-semibold text-gray-900 mb-2"
                >
                  Try Cleric for free
                </h2>
                <p className="text-gray-600">
                  Get started in under 5 minutes. No credit card required.
                </p>
              </div>

              {/* Progress indicator */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">
                    Step {currentStep} of 2
                  </span>
                  <span className="text-sm text-gray-500">
                    {currentStep === 1 ? 'Basic info' : 'Team details'}
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300 ease-out rounded-full"
                    style={{ width: `${currentStep * 50}%` }}
                  />
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {currentStep === 1 ? (
                  <Step1
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                ) : (
                  <Step2
                    formData={formData}
                    errors={errors}
                    onChange={handleInputChange}
                  />
                )}

                {/* Error message */}
                {status === 'error' && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errorMessage}</p>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="mt-8 flex gap-3">
                  {currentStep === 2 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 px-4 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                      disabled={status === 'submitting'}
                    >
                      Back
                    </button>
                  )}
                  {currentStep === 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="flex-1 px-4 py-3 text-white bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="flex-1 px-4 py-3 text-white bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        'Get started'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes modal-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-modal-in {
          animation: modal-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

interface StepProps {
  formData: FormData;
  errors: FormErrors;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

function Step1({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Work email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={onChange}
          placeholder="you@company.com"
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className="mt-1.5 text-sm text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Company */}
      <div>
        <label
          htmlFor="company"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Company name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={onChange}
          placeholder="Acme Inc."
          className={`w-full px-4 py-3 border rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors ${
            errors.company ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!errors.company}
          aria-describedby={errors.company ? 'company-error' : undefined}
        />
        {errors.company && (
          <p id="company-error" className="mt-1.5 text-sm text-red-500">
            {errors.company}
          </p>
        )}
      </div>

      {/* Role */}
      <div>
        <label
          htmlFor="role"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Your role <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer ${
              errors.role ? 'border-red-500' : 'border-gray-300'
            } ${!formData.role ? 'text-gray-400' : ''}`}
            aria-invalid={!!errors.role}
            aria-describedby={errors.role ? 'role-error' : undefined}
          >
            {roleOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errors.role && (
          <p id="role-error" className="mt-1.5 text-sm text-red-500">
            {errors.role}
          </p>
        )}
      </div>
    </div>
  );
}

function Step2({ formData, errors, onChange }: StepProps) {
  return (
    <div className="space-y-5">
      {/* Team Size */}
      <div>
        <label
          htmlFor="teamSize"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Team size <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <select
            id="teamSize"
            name="teamSize"
            value={formData.teamSize}
            onChange={onChange}
            className={`w-full px-4 py-3 border rounded-lg text-gray-900 bg-white appearance-none focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors cursor-pointer ${
              errors.teamSize ? 'border-red-500' : 'border-gray-300'
            } ${!formData.teamSize ? 'text-gray-400' : ''}`}
            aria-invalid={!!errors.teamSize}
            aria-describedby={errors.teamSize ? 'teamSize-error' : undefined}
          >
            {teamSizeOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {errors.teamSize && (
          <p id="teamSize-error" className="mt-1.5 text-sm text-red-500">
            {errors.teamSize}
          </p>
        )}
      </div>

      {/* Monitoring Tools */}
      <div>
        <label
          htmlFor="monitoringTools"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Primary monitoring tools
        </label>
        <input
          type="text"
          id="monitoringTools"
          name="monitoringTools"
          value={formData.monitoringTools}
          onChange={onChange}
          placeholder="e.g., Datadog, PagerDuty, Grafana"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      {/* Notes */}
      <div>
        <label
          htmlFor="notes"
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          Anything else we should know?
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={onChange}
          rows={3}
          placeholder="Tell us about your use case or any specific needs..."
          className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
        />
      </div>
    </div>
  );
}

function SuccessState({ onClose }: { onClose: () => void }) {
  return (
    <div className="text-center py-8">
      {/* Success icon */}
      <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-green-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Message */}
      <h3 className="text-2xl font-heading font-semibold text-gray-900 mb-3">
        Thanks for signing up!
      </h3>
      <p className="text-gray-600 mb-8">
        We'll be in touch shortly with your account details. Check your email for
        next steps.
      </p>

      {/* Close button */}
      <button
        onClick={onClose}
        className="px-6 py-3 text-white bg-primary hover:bg-primary-hover rounded-lg font-medium transition-colors"
      >
        Got it
      </button>
    </div>
  );
}
