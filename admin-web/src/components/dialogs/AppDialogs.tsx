import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  Box,
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

type BaseDialogProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  message?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  loading?: boolean;
  confirmColor?: 'primary' | 'error' | 'success' | 'warning';
};

function BaseDialog({
  open,
  onClose,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  loading,
  confirmColor = 'primary',
}: BaseDialogProps) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle fontWeight={700}>{title}</DialogTitle>
      {message ? (
        <DialogContent>
          <Typography color="text.secondary">{message}</Typography>
        </DialogContent>
      ) : null}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          {cancelLabel}
        </Button>
        {onConfirm ? (
          <Button variant="contained" color={confirmColor} onClick={onConfirm} disabled={loading}>
            {confirmLabel}
          </Button>
        ) : null}
      </DialogActions>
    </Dialog>
  );
}

export function ConfirmationDialog(props: BaseDialogProps) {
  return <BaseDialog {...props} confirmLabel={props.confirmLabel ?? 'Confirm'} />;
}

export function DeleteDialog(props: BaseDialogProps) {
  return (
    <BaseDialog
      {...props}
      title={props.title || 'Delete item'}
      message={props.message || 'This action cannot be undone.'}
      confirmLabel={props.confirmLabel ?? 'Delete'}
      confirmColor="error"
    />
  );
}

export function ApprovalDialog(props: BaseDialogProps) {
  return (
    <BaseDialog
      {...props}
      title={props.title || 'Approve'}
      message={props.message || 'Are you sure you want to approve this request?'}
      confirmLabel={props.confirmLabel ?? 'Approve'}
      confirmColor="success"
    />
  );
}

export function RejectDialog(props: BaseDialogProps) {
  return (
    <BaseDialog
      {...props}
      title={props.title || 'Reject'}
      message={props.message || 'Please confirm rejection. The user will be notified.'}
      confirmLabel={props.confirmLabel ?? 'Reject'}
      confirmColor="error"
    />
  );
}

export function SuccessDialog({
  open,
  onClose,
  title = 'Success',
  message = 'Operation completed successfully.',
}: Pick<BaseDialogProps, 'open' | 'onClose'> &
  Partial<Pick<BaseDialogProps, 'title' | 'message'>>) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <CheckCircleOutlineIcon color="success" sx={{ fontSize: 48, mb: 1 }} />
        <Typography variant="h6" fontWeight={700}>
          {title ?? 'Success'}
        </Typography>
        <Typography color="text.secondary" mt={1}>
          {message ?? 'Operation completed successfully.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button variant="contained" onClick={onClose}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function ErrorDialog({
  open,
  onClose,
  title = 'Error',
  message = 'Something went wrong. Please try again.',
}: Pick<BaseDialogProps, 'open' | 'onClose'> &
  Partial<Pick<BaseDialogProps, 'title' | 'message'>>) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogContent sx={{ textAlign: 'center', py: 4 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 1 }} />
        <Typography variant="h6" fontWeight={700}>
          {title ?? 'Error'}
        </Typography>
        <Typography color="text.secondary" mt={1}>
          {message ?? 'Something went wrong. Please try again.'}
        </Typography>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', pb: 3 }}>
        <Button variant="contained" color="error" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function LoadingDialog({
  open,
  message = 'Please wait...',
}: {
  open: boolean;
  message?: string;
}) {
  return (
    <Dialog open={open} maxWidth="xs" fullWidth>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" py={3} gap={2}>
          <CircularProgress />
          <Typography color="text.secondary">{message}</Typography>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
