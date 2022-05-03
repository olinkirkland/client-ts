import Chat from '../../models/Chat';

export default function ChatMessage({ data }: { data: Chat }) {
  return <span>{data.message}</span>;
}
