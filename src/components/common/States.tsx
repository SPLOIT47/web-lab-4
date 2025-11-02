import { useI18n } from '../../hooks/useI18n'
export const Loader = () => <div className="card"><div className="h-6 w-40 skeleton mb-4"/><div className="h-24 skeleton"/></div>
export const ErrorState: React.FC<{ msg?: string }> = ({ msg }) => {
  const { t } = useI18n();
  return <div className="card text-red-600 dark:text-red-400">{t('error')}{msg?`: ${msg}`:''}</div>
}
// export const EmptyState = () => { const { t } = useI18n(); return <div className="card">{t('empty')}</div> }
