import { UserAvatar } from '../managers/UserManager'

export const RosterItem = ({ player, i, isWaitList }) => {

    if (!isWaitList) {
        return (
            <li className={`${(i % 2) ? "bg-gray-50" : "bg-white"} flex items-center justify-around py-3 px-4 text-sm`}>
                <div className="flex items-center">
                    <UserAvatar fullName={player.fullName} className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                </div>
                <div className="font-medium text-slate-600 hover:text-slate-500">
                    {player.fullName}
                </div>
                <div className="ml-4">
                    <span className="w-0">{player.position?.primary} / {player.position?.secondary}</span>
                </div>
            </li>
        )
    }
    else {
        return (
            <li className={`${(i % 2) ? "bg-rose-100" : "bg-rose-50"} flex items-center justify-around py-3 px-4 text-sm`}>
                <div className="flex items-center">
                    <UserAvatar fullName={player.fullName} className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                </div>
                <div className="font-medium text-slate-600 hover:text-slate-500">
                    {player.fullName}
                </div>
                <div className="ml-4">
                    <span className="w-0">{player.position?.primary} / {player.position?.secondary}</span>
                </div>
            </li>
        )
    }
}
