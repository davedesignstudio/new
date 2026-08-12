import { STEPS } from '../data/pizzas';
import { currentStep, setCurrentStep } from '../stores/orderStore';

export default function StepNav() {
  const stepIndex = () => STEPS.findIndex((s) => s.id === currentStep());

  return (
    <nav class="step-nav" aria-label="Order steps">
      <div class="step-nav-inner">
        {STEPS.map((step, index) => (
          <button
            type="button"
            class={`step-item ${currentStep() === step.id ? 'active' : ''} ${index < stepIndex() ? 'completed' : ''}`}
            onClick={() => setCurrentStep(step.id)}
          >
            <span class="step-number">{index + 1}</span>
            <span class="step-label">{step.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
